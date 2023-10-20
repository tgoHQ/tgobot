import about from "./general/about.js";
import grade from "./general/grade.js";
import help from "./general/help.js";
import vcping from "./general/vcping.js";

import ban from "./moderation/ban.js";
import clean from "./moderation/clean.js";
import mute from "./moderation/mute.js";
import slowmode from "./moderation/slowmode.js";
import unban from "./moderation/unban.js";
import unmute from "./moderation/unmute.js";
import warn from "./moderation/warn.js";

import message from "./utility/message.js";

export default [
	about,
	help,
	vcping,
	grade,

	ban,
	clean,
	mute,
	slowmode,
	unban,
	unmute,
	warn,

	message,
];
