import { Api, TelegramClient } from "telegram";
import { CustomFile } from "telegram/client/uploads";
import { StoreSession, StringSession } from "telegram/sessions";
import * as fs from "fs";
import { EntityLike } from "telegram/define";
const sentences = require("./sentences.json");
const input = require("input");
const fetchChannels = require("./channels.json");
const inviter = require("./inviter.json");
const bot = require("./bot.json");
const app = require("./app.json");
const airdropMsg = fs.readFileSync("text.txt", { encoding: "utf8" });
const chatGroup = "@zksync_airdrop_group_chat";

const apiId = app.apiId;
const apiHash = app.apiHash;

(async () => {
  const session = inviter.session;
  const stringSession = new StringSession(session); // fill this later with the value from session.save()

  await (async () => {
    console.log("Connecting user: %s", inviter.name);
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
    for (const channel of fetchChannels) {
      // await client.invoke(new Api.channels.JoinChannel({ channel }));
      const users = await client.getParticipants(channel, {
        showTotal: true,
      });
      totalInvitedMember += users.length;
      console.log(
        "Total: %d, fetched: %d, Total invited: %d",
        users.total,
        users.length,
        totalInvitedMember
      );

      for (const user of users) {
        try {
          console.log(user.username);
          await client.invoke(
            new Api.channels.InviteToChannel({
              channel: chatGroup,
              users: [user.username as EntityLike],
            })
          );
        } catch (error) {}
      }
    }
  })();
})();
