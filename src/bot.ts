import registerCommands from "./commands/registerCommands.js";
await registerCommands();

import "./commands/loadCommands.js"; //load commands
import "./events/index.js"; //load events
