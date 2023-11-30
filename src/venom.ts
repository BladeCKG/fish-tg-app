import { Api, TelegramClient } from "telegram";
import { CustomFile } from "telegram/client/uploads";
import { StoreSession, StringSession } from "telegram/sessions";
import * as fs from "fs";
const sentences = require("./sentences.json");
const input = require("input");
const fetchChannels = require("./channels.json");
const user = require("./venom_user.json");
const bot = require("./bot.json");
const app = require("./app.json");
const chatGroup = "@venom_airdropasldkjf";
const airdropMsg = fs.readFileSync("venom_text.txt", { encoding: "utf8" });

const apiId = app.apiId;
const apiHash = app.apiHash;

(async () => {
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

    // console.log(await client.getParticipants("@XWINENRCAP", { limit: 100 }));
    const offset = 0;
    const limit = 100;
    await client.invoke(new Api.channels.JoinChannel({ channel: chatGroup }));

    setInterval(async () => {
      await client.sendMessage(chatGroup, {
        file: "venom_airdrop.jpg",
        message: airdropMsg,
        linkPreview: false,
        parseMode: "html",
      });
    }, 4 * 60 * 1000);
  })();
})();
