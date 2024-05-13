//job to run the "post of the week" in #photos
// import type { Job } from ".";

import { CHANNEL_PHOTOS } from "../lib/discord/loadDiscordObjects";

export default {
	name: "#photos post of the week",
	async execute() {
		const posts = await CHANNEL_PHOTOS.messages.fetch({
			limit: 100,
		});

		console.log(`fetched ${posts.size} posts`);
		//get all posts from past week
		//find the bean count for each post
		//find the post with the most bean count

		//pin the winner
		//add tag to winner
		//send a message in winner channel
	},
	schedule(): number {
		//run every sunday at noon
		return 1;
	},
}; //todo satisfies Job;
