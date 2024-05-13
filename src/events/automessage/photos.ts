import { Events } from "discord.js";
import type { Event } from "../index.js";
import { CHANNEL_PHOTOS } from "../../lib/discord/loadDiscordObjects.js";

export default {
	name: Events.ThreadCreate,

	async execute(thread) {
		if (thread.parent !== CHANNEL_PHOTOS) return; //if message not from photos channel, return

		const post = await thread.fetchStarterMessage();

		await post?.react("🫘");
	},
} satisfies Event<Events.ThreadCreate>;
