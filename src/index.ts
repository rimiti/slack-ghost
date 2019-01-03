#!/usr/bin/env node

import { RTMClient } from "@slack/client";

if (process.env.SLACK_GHOST_TOKEN.length === undefined) {
  throw new Error(`"SLACK_GHOST_TOKEN" environment variable must be set.`);
}

const rtm = new RTMClient(process.env.SLACK_GHOST_TOKEN);
let data: IStartResponse;
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
    if(isFirstConnection) {
      // @ts-ignore
      data = await rtm.start();
    }
    await rtm.subscribePresence([data.self.id]);

    if(isFirstConnection) {
      isFirstConnection = false;
      console.log(`[${new Date().toISOString()}] - You are connected as "${data.self.name}" (${data.self.id}).`)
    }
  } catch (e) {
    console.error(`[${new Date().toISOString()}] - Unable to connect you to the Slack servers:`, e);
  }
}

setInterval(connection, 5000);
