import registerCommands from "./commands/registerCommands.js";
await registerCommands();

import useApplicationCommands from "./commands/loadCommands.js";
await useApplicationCommands();

import loadEvents from "./events/load.js";
loadEvents();
