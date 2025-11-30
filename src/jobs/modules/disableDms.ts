import cron from "node-cron";
import getDuration from "../../util/getDuration.js";
import { GUILD } from "../../lib/loadDiscordObjects.js";

//run every 12 hours at midnight and noon
cron.schedule("0 0,12 * * *", disableGuildDms);

async function disableGuildDms() {
	const guild = await GUILD();
	guild.setIncidentActions({
		dmsDisabledUntil: new Date(Date.now() + getDuration.hours(12)),
	});
}
