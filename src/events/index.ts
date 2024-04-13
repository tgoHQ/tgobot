import type { ClientEvents } from "discord.js";
/**
 * Defines the structure of an event.
 */
export type Event<T extends keyof ClientEvents = keyof ClientEvents> = {
	/**
	 * The function to execute when the event is emitted.
	 *
	 * @param parameters - The parameters of the event
	 */
	execute(...parameters: ClientEvents[T]): Promise<void> | void;
	/**
	 * The name of the event to listen to
	 */
	name: T;
	/**
	 * Whether or not the event should only be listened to once
	 *
	 * @defaultValue false
	 */
	once?: boolean;
};

import client from "../lib/discord/client.js";

import memberJoin from "./logging/memberJoin.js";
import memberRemove from "./logging/memberRemove.js";
import messageDelete from "./logging/messageDelete.js";
import messageEdit from "./logging/messageEdit.js";
import ban from "./logging/ban.js";
import bulkDelete from "./logging/bulkDelete.js";

import introduction from "./automessage/introduction.js";

import gearListLink from "./automessage/gearListLink.js";
import meetups from "./automessage/meetups.js";

const events: Event[] = [
	introduction,
	memberJoin,
	memberRemove,
	messageDelete,
	messageEdit,
	meetups,
	bulkDelete,
	ban,
	gearListLink,
];

for (const event of events) {
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
