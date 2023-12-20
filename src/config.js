import "dotenv/config";
import { cleanEnv, str, num } from "envalid";

export default cleanEnv(process.env, {
	OPENAI: str(),

	TOKEN: str(),
	CLIENT_ID: num(),

	GUILD_ID: num(),

	ROLE_BOT_ID: num(),
	ROLE_VCPING_ID: num(),
	ROLE_INTRODUCED_ID: num(),

	CHANNEL_INTRODUCTIONS_ID: num(),
	CHANNEL_ALERT_ID: num(),
	CHANNEL_LOG_ID: num(),
	CHANNEL_MODLOG_ID: num(),
});
