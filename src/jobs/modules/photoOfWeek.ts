import cron from "node-cron";
import {
	CHANNEL_PHOTOS,
	CHANNEL_TOWN_HALL,
	TAG_PHOTO_OF_THE_WEEK,
} from "../../lib/loadDiscordObjects.js";
import getDuration from "../../util/getDuration.js";

import type { AnyThreadChannel } from "discord.js";

//run every Monday at 5pm
cron.schedule("0 22 * * 1", photoOfTheWeek);

export async function photoOfTheWeek() {
	const PHOTOS = await CHANNEL_PHOTOS();
	const TOWN_HALL = await CHANNEL_TOWN_HALL();
	const TAG = await TAG_PHOTO_OF_THE_WEEK();

	console.log("Awarding photo of the week");

	//fetch all active threads
	const allActiveThreads = await PHOTOS.threads.fetchActive(false);

	console.log(`Found ${allActiveThreads.threads.size} active threads`);

	//find all threads created in the last 7 days
	const thisWeekThreads: AnyThreadChannel[] = [];
	allActiveThreads.threads.forEach((thread) => {
		if (!thread.createdAt) return;
		if (thread.createdAt.getTime() < Date.now() - getDuration.days(7)) return;

		thisWeekThreads.push(thread);
	});

	console.log(
		`Found ${
			thisWeekThreads.length
		} threads from the last 7 days: ${thisWeekThreads.map(
			(thread) => thread.name,
		)}`,
	);

	//find the number of beans on each one
	const beansPerThread = await Promise.all(
		thisWeekThreads.map(async (thread) => {
			const post = await thread.fetchStarterMessage({
				cache: false,
				force: true,
			});

			if (!post) return 0;

			const reaction = post.reactions.resolve("🫘");
			if (!reaction) return 0;

			await reaction.fetch();

			return reaction.count;
		}),
	);

	for (let i = 0; i < thisWeekThreads.length; i++) {
		console.log(
			`Thread ${thisWeekThreads[i].name} has ${beansPerThread[i]} beans on it`,
		);
	}

	//find the thread with the most beans
	const winnerThread =
		thisWeekThreads[beansPerThread.indexOf(Math.max(...beansPerThread))];

	//send a message to that thread
	await winnerThread.send(
		`This post has been awarded "Photo of the Week". Congrats to <@${winnerThread.ownerId}>!`,
	);

	//give the thread the "photo of the week" tag
	const existingTags = winnerThread.appliedTags;
	//if the photo of the week tag is already applied, remove it
	const existingTagsCleaned = existingTags.filter((tag) => tag !== TAG.id);
	await winnerThread.setAppliedTags([TAG.id, ...existingTagsCleaned]);

	//post in town-hall channel
	TOWN_HALL.send({
		content: `### Photo of the Week\n\nCongrats to <@${winnerThread.ownerId}> for winning Photo of the Week with their post ${winnerThread.url}!`,
	});
}
