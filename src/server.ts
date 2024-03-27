import registerSlashCommands from "./lib/registerSlashCommands.js";
await registerSlashCommands();

import useSlashCommands from "./lib/useSlashCommands.js";
await useSlashCommands();

import loadEvents from "./events/load.js";
loadEvents();
