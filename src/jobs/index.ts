import { container } from "@sapphire/framework";
import cron from "node-cron";
import { bumpReminder } from "./modules/bumpReminder.js";
import { disableDms } from "./modules/disableDms.js";
import { photoOfWeekJob } from "./modules/photoOfWeek.js";
import { rotatePresence } from "./modules/rotatePresence.js";

export type CronJob = {
	/** cron expression for when the job runs */
	schedule: string;
	/** the function to run on schedule */
	execute: () => void | Promise<void>;
};

const jobs: CronJob[] = [
	bumpReminder,
	disableDms,
	photoOfWeekJob,
	rotatePresence,
];

export function initializeCronJobs() {
	jobs.forEach((job) => cron.schedule(job.schedule, job.execute));

	container.client.logger.info(`Cron: Loaded ${jobs.length} jobs`);
}
