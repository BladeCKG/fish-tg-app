"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var telegram_1 = require("telegram");
var uploads_1 = require("telegram/client/uploads");
var sessions_1 = require("telegram/sessions");
var fs = require("fs");
var input = require("input");
var users = require("./users.json");
var app = require("./app.json");
var groupDst = "@ashdfkjh";
var channelSrc = -2040799857;
var messageLink = "https://t.me/c/2040799857/6";
var apiId = app.apiId;
var apiHash = app.apiHash;
var axios_1 = require("axios");
function getFileSize(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, fileSize, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].head(url)];
                case 1:
                    response = _a.sent();
                    // Check if the 'content-length' header is present in the response headers
                    if (response.headers && response.headers["content-length"]) {
                        fileSize = parseInt(response.headers["content-length"], 10);
                        return [2 /*return*/, fileSize];
                    }
                    else {
                        console.error("Content-Length header not found in the response headers.");
                        return [2 /*return*/, 0];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error fetching file size:", error_1);
                    return [2 /*return*/, 0];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function downloadFile(url, destinationPath) {
    return __awaiter(this, void 0, void 0, function () {
        var response, writer_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].get(url, { responseType: "stream" })];
                case 1:
                    response = _a.sent();
                    writer_1 = fs.createWriteStream(destinationPath);
                    // Pipe the response stream into the writer
                    response.data.pipe(writer_1);
                    // Wait for the writer to finish writing the file
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            writer_1.on("finish", resolve);
                            writer_1.on("error", reject);
                        })];
                case 2:
                    // Wait for the writer to finish writing the file
                    _a.sent();
                    console.log("File downloaded and saved to: ".concat(destinationPath));
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error downloading file:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function bytesToFile(bytes, filePath) {
    try {
        // Create a write stream to save the file
        var writer = fs.createWriteStream(filePath);
        // Write the bytes to the file
        writer.write(Buffer.from(bytes));
        // End the writing process
        writer.end();
        console.log("File saved to: ".concat(filePath));
    }
    catch (error) {
        console.error("Error saving file:", error);
    }
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var user, session, stringSession;
    return __generator(this, function (_a) {
        user = users[0];
        session = user.session;
        stringSession = new sessions_1.StringSession(session);
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, photoPath, targetChannelFullUsername, fullChatInfo, photo, sender, photoFile, groupTitle, groupAbout, groupUsername, result, groupId, groupIdInt, isUsernameFine, groupFullUsername, me, _a, _b, _c, _d, _e, _f;
            var _g, _h;
            var _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        console.log("Connecting user: %s", user.name);
                        client = new telegram_1.TelegramClient(stringSession, apiId, apiHash, {
                            connectionRetries: 5
                        });
                        return [4 /*yield*/, client.start({
                                phoneNumber: 
                                // (user.phone as string) ||
                                function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, input.text("Please enter your number: ")];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                }); }); },
                                password: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, input.text("Please enter your password: ")];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                }); }); },
                                phoneCode: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, input.text("Please enter the code you received: ")];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                }); }); },
                                onError: function (err) { return console.log(err); }
                            })];
                    case 1:
                        _k.sent();
                        console.log("You should now be connected.");
                        console.log(client.session.save()); // Save this string to avoid logging in again
                        console.log("Forwarding channel to %s from %s", groupDst, user.name);
                        photoPath = "photo.png";
                        targetChannelFullUsername = "@ZOCCoinOfficial";
                        return [4 /*yield*/, client.invoke(new telegram_1.Api.channels.GetFullChannel({ channel: targetChannelFullUsername }))];
                    case 2:
                        fullChatInfo = _k.sent();
                        photo = (_j = fullChatInfo.fullChat.chatPhoto) === null || _j === void 0 ? void 0 : _j.originalArgs;
                        return [4 /*yield*/, client.getSender(photo.dcId)];
                    case 3:
                        sender = _k.sent();
                        return [4 /*yield*/, sender.send(new telegram_1.Api.upload.GetFile({
                                location: new telegram_1.Api.InputPhotoFileLocation({
                                    accessHash: photo.accessHash,
                                    fileReference: photo.fileReference,
                                    id: photo.id,
                                    thumbSize: photo.sizes[0].type
                                }),
                                precise: true,
                                limit: 1024 * 1024
                            }))];
                    case 4:
                        photoFile = (_k.sent());
                        return [4 /*yield*/, bytesToFile(photoFile.originalArgs.bytes, photoPath)];
                    case 5:
                        _k.sent();
                        groupTitle = fullChatInfo.chats[0].originalArgs.title;
                        groupAbout = fullChatInfo.fullChat.about;
                        groupUsername = "aksjdhfaosifhsdf";
                        return [4 /*yield*/, client.invoke(new telegram_1.Api.channels.CreateChannel({
                                megagroup: true,
                                title: groupTitle,
                                about: groupAbout
                            }))];
                    case 6:
                        result = _k.sent();
                        groupId = JSON.parse(JSON.stringify(result))["chats"][0]["id"];
                        console.log(groupId);
                        groupIdInt = 0 - parseInt(groupId);
                        return [4 /*yield*/, client.invoke(new telegram_1.Api.channels.CheckUsername({
                                channel: groupIdInt,
                                username: groupUsername
                            }))];
                    case 7:
                        isUsernameFine = _k.sent();
                        console.log(isUsernameFine);
                        return [4 /*yield*/, client.invoke(new telegram_1.Api.channels.UpdateUsername({
                                channel: groupIdInt,
                                username: groupUsername
                            }))];
                    case 8:
                        _k.sent();
                        groupFullUsername = "@".concat(groupUsername);
                        return [4 /*yield*/, client.getMe()];
                    case 9:
                        me = _k.sent();
                        return [4 /*yield*/, client.invoke(new telegram_1.Api.channels.EditAdmin({
                                channel: groupFullUsername,
                                userId: me.username,
                                adminRights: new telegram_1.Api.ChatAdminRights({
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
                                    other: true
                                }),
                                rank: ""
                            }))];
                    case 10:
                        _k.sent();
                        _b = (_a = client).invoke;
                        _d = (_c = telegram_1.Api.channels.EditPhoto).bind;
                        _g = {
                            channel: groupFullUsername
                        };
                        _f = (_e = telegram_1.Api.InputChatUploadedPhoto).bind;
                        _h = {};
                        return [4 /*yield*/, client.uploadFile({
                                workers: 1,
                                file: new uploads_1.CustomFile(photoPath, fs.statSync(photoPath).size, photoPath)
                            })];
                    case 11: return [4 /*yield*/, _b.apply(_a, [new (_d.apply(_c, [void 0, (_g.photo = new (_f.apply(_e, [void 0, (_h.file = _k.sent(),
                                        _h)]))(),
                                    _g)]))()])];
                    case 12:
                        _k.sent();
                        return [2 /*return*/];
                }
            });
        }); })();
        return [2 /*return*/];
    });
}); })();
