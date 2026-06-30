import { CHANNEL_BOTS } from "../../lib/loadDiscordObjects.js";
import type { CronJob } from "../index.js";

export const bumpReminder: CronJob = {
	// at midnight every 3 days
	schedule: "0 0 * * *",
	execute: async () => {
		const channel = await CHANNEL_BOTS();

		channel.send(
			"🔔 **Reminder:** Bump the server with </bump:947088344167366698>!",
		);
	},
};
