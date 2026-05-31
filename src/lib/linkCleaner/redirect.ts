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

	// if we got redirected, the output url is the destination of the redirect.
	// otherwise, no redirect was found, so the output is the same as the input.
	const outputUrl = response.redirected ? new URL(response.url) : inputUrl;

	//todo ignore it if the redirect is just from root domain to www or vice versa

	return {
		inputUrl,
		outputUrl,
		modified: inputUrl.toString() !== outputUrl.toString(),
	};
}
