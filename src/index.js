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
var sessions_1 = require("telegram/sessions");
var sentences = require("./sentences.json");
var input = require("input");
var fetchChannels = require("./channels.json");
var users = require("./users.json");
var bot = require("./bot.json");
var app = require("./app.json");
var chatGroup = "@niza_airdrop_chat";
var apiId = app.apiId;
var apiHash = app.apiHash;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _loop_1, _i, users_1, user;
    return __generator(this, function (_a) {
        _loop_1 = function (user) {
            var session = user.session;
            var stringSession = new sessions_1.StringSession(session); // fill this later with the value from session.save()
            (function () { return __awaiter(void 0, void 0, void 0, function () {
                var client, offset, limit, func1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
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
                            _a.sent();
                            console.log("You should now be connected.");
                            console.log(client.session.save()); // Save this string to avoid logging in again
                            offset = 0;
                            limit = 100;
                            return [4 /*yield*/, client.invoke(new telegram_1.Api.channels.JoinChannel({ channel: chatGroup }))];
                        case 2:
                            _a.sent();
                            func1 = function () {
                                return setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: 
                                            // try {
                                            //   await client.forwardMessages("@hellotore", {
                                            //     fromPeer: chatGroup,
                                            //     messages: 28,
                                            //   });
                                            // } catch (error) {}
                                            return [4 /*yield*/, client.sendMessage(chatGroup, {
                                                    message: sentences[Math.max(Math.ceil(Math.random() * sentences.length) - 1, 0)]
                                                })];
                                            case 1:
                                                // try {
                                                //   await client.forwardMessages("@hellotore", {
                                                //     fromPeer: chatGroup,
                                                //     messages: 28,
                                                //   });
                                                // } catch (error) {}
                                                _a.sent();
                                                // await client.sendFile("@toremifasol", {
                                                //   file: "https://t.me/toremifasol/231",
                                                //   caption: "It's me!",
                                                // });
                                                func1();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, Math.ceil(Math.random() * 60 * 5) * 1000);
                            };
                            func1();
                            return [2 /*return*/];
                    }
                });
            }); })();
        };
        for (_i = 0, users_1 = users; _i < users_1.length; _i++) {
            user = users_1[_i];
            _loop_1(user);
        }
        return [2 /*return*/];
    });
}); })();
