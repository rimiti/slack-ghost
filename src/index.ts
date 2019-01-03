#!/usr/bin/env node

import { RTMClient } from "@slack/client";

if (process.env.SLACK_GHOST_TOKEN.length === undefined) {
  throw new Error(`"SLACK_GHOST_TOKEN" environment variable must be set.`);
}

const rtm = new RTMClient(process.env.SLACK_GHOST_TOKEN);
let connected: boolean = false;
let isFirstConnection: boolean = true;

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
 */
async function connection() {
  try {
    if(!connected || !rtm.connected) {
      if(!isFirstConnection) {
        await rtm.disconnect();
      }
      // @ts-ignore
      const data:IStartResponse = await rtm.start();
      await rtm.subscribePresence([data.self.id]);
      connected = rtm.connected;

      if(isFirstConnection) {
        isFirstConnection = false;
        console.log(`[${new Date().toISOString()}] - You are connected as "${data.self.name}" (${data.self.id}).`)
      } else {
        console.log(`[${new Date().toISOString()}] - Your presence has been refreshed.`)
      }
    }
  } catch (e) {
    console.error("Unable to connect you to the Slack servers:", e);
  }
}

setInterval(connection, 5000);
