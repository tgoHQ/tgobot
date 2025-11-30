import { container } from "@sapphire/framework";
import path from "node:path";
import { glob } from "glob";

//todo export a standardized interface for cron jobs and register all the jobs in this file instead of within each module

export function initializeCronJobs() {
	container.client.logger.info("Cron: Initializing jobs");

	const jobModulePaths = glob.sync("./dist/src/jobs/modules/*.js");

	jobModulePaths.forEach((file) => {
		import(path.resolve(file));
	});
	container.client.logger.info(`Cron: Loaded ${jobModulePaths.length} jobs`);
}
