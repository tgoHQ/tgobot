import registerCommands from "./lib/registerCommands.js";
await registerCommands();

import useSlashCommands from "./lib/useSlashCommands.js";
await useSlashCommands();

import loadEvents from "./events/load.js";
loadEvents();
