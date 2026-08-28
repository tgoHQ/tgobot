import { setRotatingPresence } from "#lib/rotatePresence";
import type { CronJob } from "#jobs/index";

export const rotatePresence: CronJob = {
	// every day at midnight
	schedule: "0 0 * * *",
	execute: setRotatingPresence,
};
