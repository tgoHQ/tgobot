import { Events, Listener } from "@sapphire/framework";

import {
	CHANNEL_PHOTOS,
	CHANNEL_TRIP_REPORTS,
} from "../../lib/discord/loadDiscordObjects.js";
import getDuration from "../../lib/util/getDuration.js";
import { ThreadChannel } from "discord.js";

const sleep = (delay: number) =>
	new Promise((resolve) => setTimeout(resolve, delay));

export class ReadyListener extends Listener {
	public constructor(
		context: Listener.LoaderContext,
		options: Listener.Options
	) {
		super(context, {
			...options,
			event: Events.ThreadCreate,
		});
	}

	public async run(thread: ThreadChannel) {
		if (thread.parent !== (await CHANNEL_PHOTOS())) return; //if message not from photos channel, return

		await sleep(getDuration.seconds(6)); //bot crashes if it tries before the images are done uploading
		const post = await thread.fetchStarterMessage();

		await post?.react("🫘");

		if (post?.attachments.size === 0) {
			await post.reply(`
				Your post must contain at least one photo! This post has been locked and will be deleted in 10 minutes. Please create a new post with your photos attached.
			`);
			await thread.setLocked(true);

			//delete the post in 10 minutes
			setTimeout(() => {
				thread.delete();
			}, getDuration.minutes(10));
			return;
		}

		post?.reply(
			`Thanks for posting in the photos channel! Here are a few guidelines to to remember:
				- If your post is all photos from one camping/hiking/backpacking/etc trip, please post this in ${await CHANNEL_TRIP_REPORTS()} instead.
				- If you have more photos to post later, please create a new forum post for them.
				- This thread is only for discussion of the photos above. For general conversation, please use the relevant channels.

			People can react to your post with 🫘 to upvote it! Each week, the post with the most beans is named "Photo of the Week" and get pinned.
			`.replaceAll("	", "")
		);
	}
}
