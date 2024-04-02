import registerCommands from "./lib/registerCommands.js";
await registerCommands();

import useApplicationCommands from "./lib/useSlashCommands.js";
await useApplicationCommands();

import loadEvents from "./events/load.js";
loadEvents();
