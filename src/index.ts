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
const airdropMsg = fs.readFileSync("text.txt", { encoding: "utf8" });
const chatGroup = "@toremi1";

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
  setInterval(async () => {
    await client.sendMessage(chatGroup, {
      file: "airdrop.png",
      message: airdropMsg,
    });
  }, 5 * 60 * 1000);
})();

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

      // console.log(await client.getParticipants("@XWINENRCAP", { limit: 100 }));
      const offset = 0;
      const limit = 100;
      await client.invoke(new Api.channels.JoinChannel({ channel: chatGroup }));
      // await client.invoke(
      //   new Api.channels.JoinChannel({ channel: "@hellotore" })
      // );
      let totalInvitedMember = 0;
      // for (const channel of fetchChannels) {
      //   const users = await client.getParticipants(channel, {
      //     showTotal: true,
      //   });
      //   totalInvitedMember += users.length;
      //   console.log(
      //     "Total: %d, fetched: %d, Total invited: %d",
      //     users.total,
      //     users.length,
      //     totalInvitedMember
      //   );

      //   for (const user of users) {
      //     try {
      //       // console.log(user.username);
      //       // await client.invoke(
      //       //   new Api.channels.InviteToChannel({
      //       //     channel: "@toremifasol",
      //       //     users: [user.username as EntityLike],
      //       //   })
      //       // );
      //     } catch (error) {}
      //   }
      // }
      // await client.sendMessage("@ericbain1260", {
      //   message: "this is just for test. dont reply, bro",
      // });
      // await client.invoke(
      //   new Api.channels.InviteToChannel({
      //     channel: "@toremifasol",
      //     users: ["@imoliverlim"],
      //   })
      // );
      //https://t.me/VenomFoundation_AirDrop/204831
      const func1 = () =>
        setTimeout(async () => {
          // try {
          //   await client.forwardMessages("@hellotore", {
          //     fromPeer: chatGroup,
          //     messages: 28,
          //   });
          // } catch (error) {}
          await client.sendMessage(chatGroup, {
            message:
              sentences[
                Math.max(Math.ceil(Math.random() * sentences.length) - 1, 0)
              ],
          });

          // await client.sendFile("@toremifasol", {
          //   file: "https://t.me/toremifasol/231",
          //   caption: "It's me!",
          // });
          func1();
        }, Math.ceil(Math.random() * 60 * 3) * 1000);
      func1();
    })();
  }
})();
