import { Client } from "discord.js";

import memberJoin from "./logging/memberJoin.js";
import messageDelete from "./logging/messageDelete.js";
import messageEdit from "./logging/messageEdit.js";

import introduction from "./events/introduction.js";
import ready from "./events/ready.js";

const events = [introduction, memberJoin, messageDelete, messageEdit, ready];

/**
 * Loads events onto client
 * @param {Client} client
 */
export default function load(client) {
	for (const event of events) {
		if (event.once) {
			client.once(event.name, (...args) => event.execute(client, ...args));
		} else {
			client.on(event.name, (...args) => event.execute(client, ...args));
		}
	}
	console.log(`Client listening for ${events.length} events.`);
}
