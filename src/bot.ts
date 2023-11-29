import { Api, TelegramClient } from "telegram";
import { CustomFile } from "telegram/client/uploads";
import { StoreSession, StringSession } from "telegram/sessions";
import * as fs from "fs";
const sentences = require("./sentences.json");
const input = require("input");
const fetchChannels = require("./channels.json");
const users = require("./users.json");
const bot = require("./bot.json");
const app = require("./app.json");
const airdropMsg = fs.readFileSync("niza_text.txt", { encoding: "utf8" });
const chatGroup = "@niza_airdrop_chat";

const apiId = app.apiId;
const apiHash = app.apiHash;

(async () => {
  const session = bot.session;
  const stringSession = new StringSession(session); // fill this later with the value from session.save()
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    botAuthToken: bot.token,
    onError: (err) => console.log(err),
  });
  console.log("Bot should now be connected.");
  console.log(client.session.save()); // Save this string to avoid logging in again
  await client.sendMessage(chatGroup, {
    file: "niza_airdrop.jpg",
    message: airdropMsg,
  });
  setInterval(async () => {
    await client.sendMessage(chatGroup, {
      file: "niza_airdrop.jpg",
      message: airdropMsg,
    });
  }, 5 * 60 * 1000);
})();
