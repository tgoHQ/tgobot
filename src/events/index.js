import { Client } from "discord.js";
import ban from "./events/ban.js";
import bulkDelete from "./events/bulkDelete.js";
import introduction from "./events/introduction.js";
import kick from "./events/kick.js";
import memberJoin from "./events/memberJoin.js";
import messageDelete from "./events/messageDelete.js";
import messageEdit from "./events/messageEdit.js";
import ready from "./events/ready.js";
import unban from "./events/unban.js";

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
