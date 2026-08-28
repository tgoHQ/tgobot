import { container } from "@sapphire/framework";
import cron from "node-cron";
import { bumpReminder } from "#jobs/modules/bumpReminder";
import { disableDms } from "#jobs/modules/disableDms";
import { photoOfWeekJob } from "#jobs/modules/photoOfWeek";
import { rotatePresence } from "#jobs/modules/rotatePresence";

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
