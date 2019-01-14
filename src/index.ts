#!/usr/bin/env node
import { RTMClient } from "@slack/client";
import * as moment from "moment";

if (process.env.SLACK_GHOST_TOKEN === undefined && process.argv[2] === undefined) {
  throw new Error(`Token argument or "SLACK_GHOST_TOKEN" environment variable must be set.`);
}

let rtm: RTMClient;
let data: IStartResponse;
let isFirstConnection: boolean = true;
let lastConnection: moment.Moment;
let token: string;

if(process.env.SLACK_GHOST_TOKEN !== undefined) {
  token = process.env.SLACK_GHOST_TOKEN;
} else {
  token = process.argv[2];
}

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
 * The connection is automatically stopped and restart every 20 minutes.
 */
async function connection() {
  try {
    if(!isFirstConnection && moment().diff(lastConnection, "minutes") >= 20) {
      rtm = new RTMClient(token);
      lastConnection = moment();
      // @ts-ignore
      data = await rtm.start();
      console.log(`[${moment().format()}] - Connexion auto restarted.`);
    }

    if(isFirstConnection) {
      rtm = new RTMClient(token);
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

connection()
  .then(() => setInterval(connection, 30000))
  .catch((e: Error) => console.error(`[${moment().format()}] - Unable to launch slackghost:`, e));
