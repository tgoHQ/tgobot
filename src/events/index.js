import { Client } from "discord.js";

import ban from "./moderation/ban.js";
import bulkDelete from "./moderation/bulkDelete.js";
import kick from "./moderation/kick.js";
import unban from "./moderation/unban.js";

import memberJoin from "./logging/memberJoin.js";
import messageDelete from "./logging/messageDelete.js";
import messageEdit from "./logging/messageEdit.js";

import introduction from "./events/introduction.js";
import ready from "./events/ready.js";

const events = [
	ban,
	bulkDelete,
	introduction,
	kick,
	memberJoin,
	messageDelete,
	messageEdit,
	ready,
	unban,
];

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
