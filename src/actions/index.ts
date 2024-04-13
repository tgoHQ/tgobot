export interface ModActionModule {}

import bulkDelete from "./tools/bulkDelete";
import slowmode from "./tools/slowmode";

import ban from "./users/ban";
import kick from "./users/kick";
import timeout from "./users/timeout";

export const actions = [
	bulkDelete,
	slowmode,
	ban,
	kick,
	timeout,
] satisfies ModActionModule[];
