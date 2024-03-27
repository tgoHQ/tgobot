import client from "../lib/client.js";

import memberJoin from "./logging/memberJoin.js";
import messageDelete from "./logging/messageDelete.js";
import messageEdit from "./logging/messageEdit.js";

import introduction from "./events/introduction.js";
import ready from "./events/ready.js";

import links from "./automod/links.js";

const events = [
	introduction,
	memberJoin,
	messageDelete,
	messageEdit,
	ready,
	links,
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
