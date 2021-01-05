import * as Discord from "discord.js";
import * as Dotenv from "dotenv";
import { CommandHandler } from "./src/service/CommandHandler.service"
import _ from "lodash";

import { NetworkUtil } from "./src/util/Network.util";
import fs from "fs";

Dotenv.config();

const accessToken: string | undefined = process.env.ACCESS_TOKEN;

if (accessToken) {
  const client: Discord.Client = new Discord.Client();

  // const commandHandler: CommandHandler = new CommandHandler(client);

  client.on("message", async (message: Discord.Message) => {
    console.log(message);
    
    const replyList: string[] = [
      "My name Jeff.", "MA NEM JEFF",
      "https://www.youtube.com/watch?v=6CKoBtMsdSw",
      "https://www.youtube.com/watch?v=AfIOBLr1NDU"
    ];

    if (message.content === "$jeff") message.reply(_.sample(replyList) || replyList[0]);
    if (message.content === "$jeff ping") message.reply("pong.");

    if (message.content === "$jeff mc -addr") {
      (async () => {
        const allowedServers: string[] = JSON.parse(fs.readFileSync('allowed-servers.json', 'utf8'));
        const serverId: string | undefined = message.guild?.id;

        if (serverId && allowedServers.includes(serverId)) {
          const globalIpAddress: string = await NetworkUtil.getGlobalIpAddress();
          message.reply(`current server address is "\`${globalIpAddress}\`".`);
        } else {
          message.reply("`mc` command is not allowed on this server.")
        }
      })()
    }
  })

  client.login(accessToken);
} else {
  console.error("The access token was not found.");
}
