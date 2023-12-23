import registerSlashCommands from "./util/registerSlashCommands.js";
await registerSlashCommands();

import useSlashCommands from "./util/useSlashCommands.js";
await useSlashCommands();

import loadEvents from "./events/index.js";
loadEvents();

import discordObjs from "./util/discordObjs.js";
