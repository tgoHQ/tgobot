/** the return type of the cleanRedirect function */
export type RedirectResult = {
	/** the original URL that was passed in */
	inputUrl: URL;
	/** the cleaned URL with redirect removed */
	outputUrl: URL;
	/** whether or not the URL was changed by this step */
	modified: boolean;
};

/** removes redirects from a URL */
export async function cleanRedirect(inputUrl: URL): Promise<RedirectResult> {
	const response = await fetch(inputUrl);
	const outputUrl = new URL(response.url);
	return {
		inputUrl,
		outputUrl,
		modified: inputUrl.toString() !== outputUrl.toString(),
	};
}
