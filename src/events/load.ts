import client from "../lib/client.js";
import type { Event } from "./index.js";

import memberJoin from "./logging/memberJoin.js";
import messageDelete from "./logging/messageDelete.js";
import messageEdit from "./logging/messageEdit.js";

import introduction from "./automessage/introduction.js";
import ready from "./events/ready.js";

import meetups from "./automessage/meetups.js";
import bulkDelete from "./logging/bulkDelete.js";
import ban from "./logging/ban.js";

const events: Event[] = [
	introduction,
	memberJoin,
	messageDelete,
	messageEdit,
	ready,
	meetups,
	bulkDelete,
	ban,
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
