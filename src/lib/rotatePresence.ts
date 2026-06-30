import { container } from "@sapphire/framework";
import { ActivityType, type ActivitiesOptions } from "discord.js";

// presence configs to rotate through, one per day. only the first activity in
// each config is shown (bots only render one), so each entry is a single activity.
const presences: ActivitiesOptions[] = [
	{ type: ActivityType.Playing, name: "outside" },
	{ type: ActivityType.Custom, name: "🫘 I;m thinking about thos Beans" },
	{ type: ActivityType.Custom, name: "touched grass (it was wet)" },
	{ type: ActivityType.Watching, name: "the campfire" },
	{ type: ActivityType.Custom, name: "just think of the weight savings" },
	{ type: ActivityType.Watching, name: "the sunset" },
	{ type: ActivityType.Custom, name: "sawing my toothbrush in half" },
	{ type: ActivityType.Watching, name: "my base weight" },
	{ type: ActivityType.Custom, name: "shorter the shorts, quicker the miles" },
	{ type: ActivityType.Custom, name: "shivering to save 2 oz" },
	{ type: ActivityType.Listening, name: "the birds" },
	{ type: ActivityType.Custom, name: "have you even heard of ray jardine?" },
	{ type: ActivityType.Listening, name: "mosquitoes" },
	{ type: ActivityType.Custom, name: "is this aid?" },
	{
		type: ActivityType.Streaming,
		name: "my thru-hike",
		url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
	},
	{ type: ActivityType.Playing, name: "with my digital scale" },
	{ type: ActivityType.Custom, name: "intimidate your surroundings" },
	{
		type: ActivityType.Custom,
		name: "going outside reduces the lifespan of your gear",
	},
	{ type: ActivityType.Custom, name: "prepping for my unsupported AT fkt" },
	{ type: ActivityType.Custom, name: "technically it's worn weight" },
	{
		type: ActivityType.Custom,
		name: "can't wait to get home and edit my lighterpack",
	},
	{ type: ActivityType.Custom, name: "🫴🦋 is this ultralight?" },
	{ type: ActivityType.Playing, name: "knocking over cairns" },
	{
		type: ActivityType.Playing,
		name: "the game",
	},
	{
		type: ActivityType.Streaming,
		name: "new archwood product dropping in 5 mins",
		url: "https://www.youtube.com/watch?v=hXt9jJEq8wg",
	},
];

/** number of days elapsed in the current year (local time) */
function dayOfYear(date = new Date()): number {
	const start = new Date(date.getFullYear(), 0, 0);
	return Math.floor((date.getTime() - start.getTime()) / 86_400_000);
}

/**
 * Sets the bot's presence to the config for the current day of the year. Seeding
 * from the day of year (rather than an in-memory counter) keeps rotation stable
 * across restarts and lets the ready listener and the daily cron share the logic.
 */
export function setRotatingPresence() {
	const index = dayOfYear() % presences.length;

	console.log(`Loaded ${presences.length} statuses`);

	console.log(`Setting activity to ${presences[index].name}`);

	container.client.user?.setActivity(presences[index]);
}
