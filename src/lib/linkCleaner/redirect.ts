/** the return type of the cleanRedirect function */
export type CleanRedirectResult = {
	/** the original URL that was passed in */
	inputUrl: URL;
	/** the cleaned URL with redirect removed */
	outputUrl: URL;
	/** whether or not the URL was changed by this step */
	modified: boolean;
};

/** removes redirects from a URL */
export async function cleanRedirect(url: URL): Promise<CleanRedirectResult> {
	const inputUrl = new URL(url.toString());

	let outputUrl = new URL(url.toString());

	try {
		const response = await fetch(inputUrl.toString());
		outputUrl = new URL(response.url);
	} catch (e) {}

	return {
		inputUrl,
		outputUrl,
		modified: inputUrl.toString() !== outputUrl.toString(),
	};
}
