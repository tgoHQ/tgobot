import { setRotatingPresence } from "../../lib/rotatePresence.js";
import type { CronJob } from "../index.js";

export const rotatePresence: CronJob = {
	// every day at midnight
	schedule: "0 0 * * *",
	execute: setRotatingPresence,
};
