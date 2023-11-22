import { Api, TelegramClient } from "telegram";
import { CustomFile } from "telegram/client/uploads";
import { StoreSession, StringSession } from "telegram/sessions";
import * as fs from "fs";
const sentences = require("./sentences.json");
const input = require("input");
const fetchChannels = require("./channels.json");
const users = require("./all_users.json");
const bot = require("./bot.json");
const app = require("./app.json");
const airdropMsg = fs.readFileSync("text.txt", { encoding: "utf8" });
const chatGroup = "@toremi1";

const apiId = app.apiId;
const apiHash = app.apiHash;

(async () => {
  for (const user of users) {
    const session = user.session;
    const stringSession = new StringSession(session); // fill this later with the value from session.save()

    await (async () => {
      console.log("Connecting user: %s", user.name);
      const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
      });
      await client.start({
        phoneNumber:
          // (user.phone as string) ||
          async () => await input.text("Please enter your number: "),
        password: async () => await input.text("Please enter your password: "),
        phoneCode: async () =>
          await input.text("Please enter the code you received: "),
        onError: (err) => console.log(err),
      });
      console.log("You should now be connected.");
      console.log(client.session.save()); // Save this string to avoid logging in again
    })();
  }
})();
