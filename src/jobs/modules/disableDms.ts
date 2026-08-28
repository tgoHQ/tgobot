import { getDuration } from "#util/getDuration";
import { GUILD } from "#lib/loadDiscordObjects";
import type { CronJob } from "#jobs/index";

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
