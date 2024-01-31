import { Api, TelegramClient } from "telegram";
import { CustomFile } from "telegram/client/uploads";
import { StoreSession, StringSession } from "telegram/sessions";
import * as fs from "fs";
const input = require("input");
const users = require("./inviter.json");
const app = require("./app.json");
const groupDst = "@ashdfkjh";
const channelSrc = -2040799857;
const messageLink = "https://t.me/c/2040799857/6";

const apiId = app.apiId;
const apiHash = app.apiHash;

(async () => {
  const user = users[0];
  const session = user.session;
  const stringSession = new StringSession(session); // fill this later with the value from session.save()

  (async () => {
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

    console.log("Forwarding channel to %s from %s", groupDst, user.name);
    // await client.sendMessage("me", { message: "hello" });
    // try {
    // await client.invoke(new Api.channels.JoinChannel({ channel: channel }));
    await client.sendMessage(channelSrc, { message: "hello" });
    // await client.sendMessage(groupDst, { message: "hello" });
    await client.forwardMessages(groupDst, {
      messages: [6],
      fromPeer: channelSrc,
    });
    // } catch (error) {}
  })();
})();
