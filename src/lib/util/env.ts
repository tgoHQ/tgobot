import dotenv from "dotenv";
dotenv.config();

import { cleanEnv, str } from "envalid";

export default cleanEnv(process.env, {
	OPENAI: str(),

	TOKEN: str(),
	CLIENT_ID: str(),
	GUILD_ID: str(),

	ROLE_BOT_ID: str(),
	ROLE_VCPING_ID: str(),
	ROLE_INTRODUCED_ID: str(),

	CHANNEL_INTRODUCTIONS_ID: str(),
	CHANNEL_ALERT_ID: str(),
	CHANNEL_LOG_ID: str(),
	CHANNEL_MODLOG_ID: str(),
	CHANNEL_INFO_ID: str(),
	CHANNEL_MEETUPS_ID: str(),
	CHANNEL_PHOTOS_ID: str(),
	CHANNEL_TRIP_REPORTS_ID: str(), 
	TAG_PHOTO_OF_THE_WEEK_ID: str(),

	DB_URL: str(),
});
