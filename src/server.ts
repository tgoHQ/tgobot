import registerCommands from "./lib/discord/registerCommands.js";
await registerCommands();

import useApplicationCommands from "./lib/discord/useSlashCommands.js";
await useApplicationCommands();

import loadEvents from "./events/load.js";
loadEvents();
