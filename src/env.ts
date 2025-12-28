import dotenv from "dotenv";
dotenv.config({
	quiet: true,
});

import { z } from "zod";

const envSchema = z.object({
	TOKEN: z.string(),
	GUILD_ID: z.string(),
	DB_URL: z.string(),
	GUIDE_SEARCH_URL: z.url(),
	OPENAI_API_KEY: z.string().startsWith("sk-"),

	ROLE_BOT_ID: z.string(),
	ROLE_VCPING_ID: z.string(),
	ROLE_INTRODUCED_ID: z.string(),
	ROLE_MODERATOR_ID: z.string(),
	ROLE_EXPERT_ID: z.string(),
	ROLE_BOOSTER_ID: z.string(),
	ROLE_BOOSTER_COSMETIC_ID: z.string(),
	ROLE_LEAVING_ALERT_ID: z.string(),
	ROLE_HONEYPOT_ID: z.string(),
	ROLE_MINECRAFT_ID: z.string(),

	CHANNEL_INTRODUCTIONS_ID: z.string(),
	CHANNEL_ALERT_ID: z.string(),
	CHANNEL_LOG_ID: z.string(),
	CHANNEL_MODLOG_ID: z.string(),
	CHANNEL_INFO_ID: z.string(),
	CHANNEL_MEETUPS_ID: z.string(),
	CHANNEL_PHOTOS_ID: z.string(),
	CHANNEL_TRIP_REPORTS_ID: z.string(),
	CHANNEL_TOWN_HALL_ID: z.string(),
	CHANNEL_BOTS_ID: z.string(),

	CHANNEL_NATURE_ID: z.string(),
	CHANNEL_CLIMBING_ID: z.string(),
	CHANNEL_BIKING_ID: z.string(),
	CHANNEL_ALPINE_ID: z.string(),
	CHANNEL_CAMPING_ID: z.string(),
	CHANNEL_HIKING_ID: z.string(),
	CHANNEL_ON_THE_WATER_ID: z.string(),
	CHANNEL_WINTER_SPORTS_ID: z.string(),

	TAG_PHOTO_OF_THE_WEEK_ID: z.string(),
});

//todo create zod schema for discord snowflakes/ids
//todo auto-populate the channel and role keys in this object from a registry linked to the discord object loader (DRY)

export const env = envSchema.parse(process.env);
