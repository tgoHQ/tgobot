//when a message is sent
//check if nature channel
//check if has 2 or more photos
//send message

import { Events } from "discord.js";
import type { Event } from "../index.js";
import {
	CHANNEL_NATURE,
	CHANNEL_PHOTOS,
} from "../../lib/discord/loadDiscordObjects.js";

export default {
	name: Events.MessageCreate,

	async execute(message) {
		if (message.channel !== CHANNEL_NATURE) return; //if message not from photos channel, return

		if (message?.attachments.size >= 3) {
			await message.reply(`
				Thanks for posting! This channel is intended mainly for text discussion about nature. Please use ${CHANNEL_PHOTOS} instead for posting nature photography.
			`);
		}
	},
} satisfies Event<Events.MessageCreate>;
