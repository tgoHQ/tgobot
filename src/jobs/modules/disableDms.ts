import { getDuration } from "../../util/getDuration.js";
import { GUILD } from "../../lib/loadDiscordObjects.js";
import type { CronJob } from "../index.js";

export const disableDms: CronJob = {
	// run every 12 hours at midnight and noon
	schedule: "0 0,12 * * *",
	execute: async () => {
		const guild = await GUILD();
		guild.setIncidentActions({
			dmsDisabledUntil: new Date(Date.now() + getDuration.hours(12)),
		});
	},
};
