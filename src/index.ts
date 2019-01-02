#!/usr/bin/env node

import { RTMClient } from "@slack/client";

if (!process.env.SLACK_GHOST_TOKEN) {
  throw new Error(`"SLACK_GHOST_TOKEN" environment variable must be set.`);
}

const rtm = new RTMClient(process.env.SLACK_GHOST_TOKEN);
let connected: boolean = false;
let isFirstConnection: boolean = true;

/**
 * @description Connect user an simulate activity to appear as connected.
 */
async function connection() {
  try {
    if(!connected || !rtm.connected) {
      if(!isFirstConnection) {
        await rtm.disconnect();
      }
      //@ts-ignore
      const {self} = await rtm.start();

      await rtm.subscribePresence(self.id);
      connected = rtm.connected;

      if(isFirstConnection) {
        isFirstConnection = false;
        console.log(`[${new Date().toISOString()}] - You are connected as "${self.name}" (${self.id}).`)
      } else {
        console.log(`[${new Date().toISOString()}] - Your presence has been refreshed.`)
      }
    }
  } catch (e) {
    console.error("Unable to connect you to the Slack servers.");
  }
}

setInterval(connection, 5000);
