import client from "../lib/discord/client.js";
import type { Event } from "./index.js";

import memberJoin from "./logging/memberJoin.js";
import memberRemove from "./logging/memberRemove.js";
import messageDelete from "./logging/messageDelete.js";
import messageEdit from "./logging/messageEdit.js";

import introduction from "./automessage/introduction.js";
import ready from "./events/ready.js";

import meetups from "./automessage/meetups.js";
import bulkDelete from "./logging/bulkDelete.js";
import ban from "./logging/ban.js";
import gearListLink from "./automessage/gearListLink.js";

const events: Event[] = [
	introduction,
	memberJoin,
	memberRemove,
	messageDelete,
	messageEdit,
	ready,
	meetups,
	bulkDelete,
	ban,
	gearListLink,
];

export default function load() {
	for (const event of events) {
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
	console.log(`Client listening for ${events.length} events.`);
}
