import { Events } from "discord.js";
import type { Event } from "../index.js";
import {
	CHANNEL_PHOTOS,
	CHANNEL_TRIP_REPORTS,
} from "../../lib/discord/loadDiscordObjects.js";

export default {
	name: Events.ThreadCreate,

	async execute(thread) {
		if (thread.parent !== CHANNEL_PHOTOS) return; //if message not from photos channel, return

		const post = await thread.fetchStarterMessage();

		await post?.react("🫘");

		post?.reply(
			`Thanks for posting in the photos channel! Here are a few guidelines to to remember:
				- If your post is all photos from one camping/hiking/backpacking/etc trip, please post this in ${CHANNEL_TRIP_REPORTS} instead.
				- If you have more photos to post later, please create a new forum post for them.
				- This thread is only for discussion of the photos above. For general conversation, please use the relevant channels.

			People can react to your post with 🫘 to upvote it! Each week, the post with the most beans is named "Photo of the Week" and get pinned.
			`.replaceAll("	", "")
		);
	},
} satisfies Event<Events.ThreadCreate>;
