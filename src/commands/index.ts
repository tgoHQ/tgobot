import about from "./general/about.js";
import help from "./general/help.js";
import vcping from "./general/vcping.js";
import ask from "./general/ask.js";
import grade from "./general/grade.js";
import gearlist from "./general/gearlist.js";

import clean from "./moderation/clean.js";
import timeout from "./moderation/timeout.js";
import slowmode from "./moderation/slowmode.js";
import untimeout from "./moderation/untimeout.js";
import lookup from "./moderation/lookup.js";
import infraction from "./moderation/infraction.js";

import message from "./utility/message.js";

export default [
	about,
	help,
	vcping,
	ask,
	grade,
	gearlist,

	clean,
	timeout,
	slowmode,
	untimeout,
	lookup,
	// infraction,

	message,
];
