#!/usr/bin/env node
import { RTMClient } from "@slack/client";
import * as moment from "moment";

if (process.env.SLACK_GHOST_TOKEN === undefined) {
  throw new Error(`"SLACK_GHOST_TOKEN" environment variable must be set.`);
}

const rtm = new RTMClient(process.env.SLACK_GHOST_TOKEN);
let data: IStartResponse;
let isFirstConnection: boolean = true;
let lastConnection: moment.Moment;
/**
 * @description IStartResponse interface.
 */
interface IStartResponse {
  self: {
    id: string;
    name: string;
  }
}

/**
 * @description Connect user an simulate activity to appear as connected.
 * The connection is automatically stopped and restart every 28 minutes.
 */
async function connection() {
  try {
    if(!isFirstConnection && moment().diff(lastConnection, "seconds") >= 28) {
      lastConnection = moment();
      await rtm.disconnect();
      // @ts-ignore
      data = await rtm.start();
      console.log(`[${moment().format()}] - Connexion auto restarted.`);
    }

    if(isFirstConnection) {
      isFirstConnection = false;
      lastConnection = moment();
      // @ts-ignore
      data = await rtm.start();
      console.log(`[${moment().format()}] - You are connected as "${data.self.name}" (${data.self.id}).`)
    }
    await rtm.subscribePresence([data.self.id]);
  } catch (e) {
    console.error(`[${moment().format()}] - Unable to connect you to the Slack servers:`, e);
  }
}

setInterval(connection, 5000);
