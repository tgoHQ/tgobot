/** sleep for a given number of milliseconds */
export async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
