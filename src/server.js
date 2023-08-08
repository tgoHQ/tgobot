"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var node_fs_1 = require("node:fs");
var node_path_1 = require("node:path");
var discord_js_1 = require("discord.js");
var client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildBans,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
    presence: {
        activities: [
            {
                name: "outside"
            },
        ]
    },
    allowedMentions: {
        parse: ["roles", "users"]
    }
});
var index_mjs_1 = require("./commands/index.mjs");
var register_mjs_1 = require("./commands/register.mjs");
await (0, register_mjs_1["default"])(index_mjs_1["default"]);
var use_mjs_1 = require("./commands/use.mjs");
await (0, use_mjs_1["default"])(client, index_mjs_1["default"]);
//load events
var eventsPath = node_path_1["default"].resolve("src/events");
var eventFiles = node_fs_1["default"]
    .readdirSync(eventsPath)
    .filter(function (file) { return file.endsWith(".mjs"); });
var _loop_1 = function (file) {
    var filePath = node_path_1["default"].join(eventsPath, file);
    var event_1 = (await Promise.resolve().then(function () { return require(filePath); }))["default"];
    if (event_1.once) {
        client.once(event_1.name, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return event_1.execute.apply(event_1, __spreadArray([client], args, false));
        });
    }
    else {
        client.on(event_1.name, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return event_1.execute.apply(event_1, __spreadArray([client], args, false));
        });
    }
};
for (var _i = 0, eventFiles_1 = eventFiles; _i < eventFiles_1.length; _i++) {
    var file = eventFiles_1[_i];
    _loop_1(file);
}
console.log("Client listening for ".concat(eventFiles.length, " events."));
client.login(process.env.TOKEN);
