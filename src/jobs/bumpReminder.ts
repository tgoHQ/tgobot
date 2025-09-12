import cron from "node-cron";
import { CHANNEL_BOTS } from "../lib/discord/loadDiscordObjects.js";

// at midnight every 3 days
cron.schedule("0 0 * * *", async () => {
	const channel = await CHANNEL_BOTS();

	channel.send(
		"🔔 **Reminder:** Bump the server with </bump:947088344167366698>!",
	);
});