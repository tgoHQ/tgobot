import dotenv from "dotenv";
dotenv.config();

import { cleanEnv, str, url } from "envalid";

const env = cleanEnv(process.env, {
	TOKEN: str(),
	GUILD_ID: str(),
	DB_URL: str(),
	GUIDE_SEARCH_URL: url(),
	OPENAI: str(),

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
	CHANNEL_TOWN_HALL_ID: str(),
	
	CHANNEL_NATURE_ID: str(),
	CHANNEL_CLIMBING_ID: str(),
	CHANNEL_BIKING_ID: str(),
	CHANNEL_ALPINE_ID: str(),
	CHANNEL_CAMPING_ID: str(),
	CHANNEL_HIKING_ID: str(),
	CHANNEL_ON_THE_WATER_ID: str(),
	CHANNEL_WINTER_SPORTS_ID: str(),

});
export default env;

//todo attach env to container for easy import

// container.env = env;

// declare module "@sapphire/pieces" {
// 	interface Container {
// 		env: typeof env;
// 	}
// }
// container.env;
// https://sapphirejs.dev/docs/Guide/additional-information/using-and-extending-container/
