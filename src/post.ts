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
const channelAdmins = require("./channel_admin.json");
const airdropMsg = fs.readFileSync("text.txt", { encoding: "utf8" });
const chatGroup = "@mufexfi";
const fromChannels = ["@WatcherGuru", "@mufexannouncement"];

const apiId = app.apiId;
const apiHash = app.apiHash;

(async () => {
  const channelAdmin = channelAdmins[1];
  const session = channelAdmin.session;
  const stringSession = new StringSession(session); // fill this later with the value from session.save()

  console.log("Connecting user: %s", channelAdmin.name);
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

  for (const fromChannel of fromChannels) {
    (async () => {
      await client.invoke(
        new Api.channels.JoinChannel({ channel: fromChannel })
      );
      let lastMsg: Api.Message;
      const msgs = await client.getMessages(fromChannel, { limit: 1 });
      lastMsg = msgs[0];

      await client.sendMessage(chatGroup, {
        message: msgs[0].message,
        file: msgs[0].photo,
      });
      try {
      } catch (error) {}
      const func1 = () =>
        setTimeout(async () => {
          const msgs = await client.getMessages(fromChannel, { limit: 1 });
          if (msgs[0].id == lastMsg?.id) {
            return;
          }
          try {
            await client.sendMessage(chatGroup, {
              message: msgs[0].message,
              file: msgs[0].photo,
            });
            lastMsg = msgs[0];
          } catch (error) {}

          // await client.sendFile("@toremifasol", {
          //   file: "https://t.me/toremifasol/231",
          //   caption: "It's me!",
          // });
          func1();
        }, 10 * 60 * 1000);
      func1();
    })();
  }
})();
