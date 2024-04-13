import "./commands/handleCommands.js"; //load commands
import "./events/index.js"; //load events

import registerCommands from "./commands/registerCommands.js";
await registerCommands();

import client from "./lib/discord/client.js";
console.log(`${client.user!.displayName} ready!`);
