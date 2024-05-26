// //job to run the "post of the week" in #photos
// // import type { Job } from ".";

// // import { ChannelFlags, ThreadChannel } from "discord.js";
// import {
// 	CHANNEL_PHOTOS,
// 	TAG_PHOTO_OF_THE_WEEK,
// } from "../lib/discord/loadDiscordObjects.js";
// import getDuration from "../lib/util/getDuration.js";

// const fetchQuantity = 100;

// export default {
// 	name: "#photos post of the week",
// 	async execute() {
// 		await CHANNEL_PHOTOS.threads.fetchActive(true);
// 		await CHANNEL_PHOTOS.threads.fetchArchived(
// 			{ type: "public", limit: fetchQuantity },
// 			true
// 		);

// 		const thisWeekThreads = CHANNEL_PHOTOS.threads.cache.filter(
// 			async (thread) => {
// 				return thread.createdAt! > new Date(Date.now() - getDuration.days(7));
// 			}
// 		);

// 		let mostVotedPost: {
// 			votes: number;
// 			thread: ThreadChannel | null;
// 		} = {
// 			votes: 0,
// 			thread: null,
// 		};

// 		for (const [, thread] of thisWeekThreads) {
// 			const post = await thread.fetchStarterMessage();

// 			const votes = post?.reactions.resolve("🫘")?.count ?? 0;

// 			if (votes > mostVotedPost.votes) {
// 				mostVotedPost = {
// 					votes,
// 					thread,
// 				};
// 			}
// 		}

// 		console.log(mostVotedPost.votes, mostVotedPost.thread?.name);


// 		// console.log(CHANNEL_PHOTOS.flags[2])
// 		await mostVotedPost.thread?.pin();
// 		const tags =  mostVotedPost.thread!.appliedTags
// 		await mostVotedPost.thread?.setAppliedTags([...tags, TAG_PHOTO_OF_THE_WEEK]);
// 		await (await mostVotedPost.thread?.fetchStarterMessage())?.reply(
// 			"post of the week"
// 		);

// 	},
// 	schedule(): number {
// 		//run every sunday at noon
// 		return 1;
// 	},
// }; //todo satisfies Job;
