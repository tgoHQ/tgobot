export type Job = {
	name: string;
	execute(): Promise<void>;
	schedule(): number;
};

import weeklyPhoto from "./weeklyPhoto";

const jobs = [weeklyPhoto];

for (const job of jobs) {
	job.schedule();
	console.log(`Scheduled ${job.name} job.`);
}
