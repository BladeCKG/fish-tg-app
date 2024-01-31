import { Api, TelegramClient } from "telegram";
import { CustomFile } from "telegram/client/uploads";
import { StoreSession, StringSession } from "telegram/sessions";
import * as fs from "fs";
const input = require("input");
const users = require("./users.json");
const app = require("./app.json");
const groupDst = "@ashdfkjh";
const channelSrc = -2040799857;
const messageLink = "https://t.me/c/2040799857/6";

const apiId = app.apiId;
const apiHash = app.apiHash;
import axios from "axios";

async function getFileSize(url: string): Promise<number> {
  try {
    // Make a HEAD request to the file URL to get its metadata
    const response = await axios.head(url);

    // Check if the 'content-length' header is present in the response headers
    if (response.headers && response.headers["content-length"]) {
      // Parse the content-length header to get the file size
      const fileSize = parseInt(response.headers["content-length"], 10);
      return fileSize;
    } else {
      console.error("Content-Length header not found in the response headers.");
      return 0;
    }
  } catch (error) {
    console.error("Error fetching file size:", error);
    return 0;
  }
}
async function downloadFile(
  url: string,
  destinationPath: string
): Promise<void> {
  try {
    // Make a GET request to the file URL
    const response = await axios.get(url, { responseType: "stream" });

    // Create a write stream to save the file
    const writer = fs.createWriteStream(destinationPath);

    // Pipe the response stream into the writer
    response.data.pipe(writer);

    // Wait for the writer to finish writing the file
    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    console.log(`File downloaded and saved to: ${destinationPath}`);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}
function bytesToFile(bytes: Uint8Array, filePath: string): void {
  try {
    // Create a write stream to save the file
    const writer = fs.createWriteStream(filePath);

    // Write the bytes to the file
    writer.write(Buffer.from(bytes));

    // End the writing process
    writer.end();

    console.log(`File saved to: ${filePath}`);
  } catch (error) {
    console.error("Error saving file:", error);
  }
}
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
    // await client.sendMessage(channelSrc, { message: "hello" });
    // // await client.sendMessage(groupDst, { message: "hello" });
    // await client.forwardMessages(groupDst, {
    //   messages: [6],
    //   fromPeer: channelSrc,
    // });

    // const onlinePhotoUrl =
    //   "https://s2.coinmarketcap.com/static/img/coins/128x128/1.png";
    const photoPath = "photo.png";

    const targetChannelFullUsername = "@ZOCCoinOfficial";
    const fullChatInfo = await client.invoke(
      new Api.channels.GetFullChannel({ channel: targetChannelFullUsername })
    );
    const photo = fullChatInfo.fullChat.chatPhoto?.originalArgs as Api.Photo;
    // console.log(fullChatInfo);
    const sender = await client.getSender(photo.dcId);
    const photoFile = (await sender.send(
      new Api.upload.GetFile({
        location: new Api.InputPhotoFileLocation({
          accessHash: photo.accessHash,
          fileReference: photo.fileReference,
          id: photo.id,
          thumbSize: photo.sizes[0].type,
        }),
        precise: true,
        limit: 1024 * 1024,
      })
    )) as Api.upload.GetFile;
    await bytesToFile(
      (photoFile.originalArgs as Api.upload.File).bytes,
      photoPath
    );

    const groupTitle = (fullChatInfo.chats[0].originalArgs as Api.Chat).title;
    const groupAbout = fullChatInfo.fullChat.about;
    const groupUsername = "aksjdhfaosifhsdf";
    const result = await client.invoke(
      new Api.channels.CreateChannel({
        megagroup: true,
        title: groupTitle,
        about: groupAbout,
      })
    );

    const groupId = JSON.parse(JSON.stringify(result))["chats"][0]["id"];
    console.log(groupId);
    const groupIdInt = 0 - parseInt(groupId);
    const isUsernameFine = await client.invoke(
      new Api.channels.CheckUsername({
        channel: groupIdInt,
        username: groupUsername,
      })
    );
    console.log(isUsernameFine);
    await client.invoke(
      new Api.channels.UpdateUsername({
        channel: groupIdInt,
        username: groupUsername,
      })
    );
    const groupFullUsername = `@${groupUsername}`;
    const me = await client.getMe();
    await client.invoke(
      new Api.channels.EditAdmin({
        channel: groupFullUsername,
        userId: (me as Api.User).username,
        adminRights: new Api.ChatAdminRights({
          changeInfo: true,
          postMessages: true,
          editMessages: true,
          deleteMessages: true,
          banUsers: true,
          inviteUsers: true,
          pinMessages: true,
          addAdmins: true,
          anonymous: true,
          manageCall: true,
          other: true,
        }),
        rank: "",
      })
    );
    await client.invoke(
      new Api.channels.EditPhoto({
        channel: groupFullUsername,
        photo: new Api.InputChatUploadedPhoto({
          file: await client.uploadFile({
            workers: 1,
            file: new CustomFile(
              photoPath,
              fs.statSync(photoPath).size,
              photoPath
            ),
          }),
        }),
      })
    );
    // } catch (error) {}
  })();
})();
