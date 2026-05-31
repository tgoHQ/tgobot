import { cleanRedirect, RedirectResult } from "./redirect.js";
import { sanitizeUrl, SanitizeResult } from "./sanitize.js";
import { cleanParams } from "./params.js";

/** the return type of the cleanLink function */
export type CleanLinkResult = {
	inputUrl: URL;
	outputUrl: URL;
	modified: boolean;
	redirect: RedirectResult;
	sanitize: SanitizeResult;
};

/** cleans a URL */
export async function cleanLink(inputUrl: URL): Promise<CleanLinkResult> {
	const redirect = await cleanRedirect(inputUrl);

	const sanitizeResults = sanitizeUrl(redirect.outputUrl);
	const paramsResults = cleanParams(new URL(sanitizeResults.outputUrl));

	const totalParams = sanitizeResults.removedParams.concat(
		paramsResults.removedParams,
	);

	return {
		inputUrl,
		outputUrl: paramsResults.outputUrl,
		modified: inputUrl.toString() !== paramsResults.outputUrl.toString(),

		redirect: redirect,
		sanitize: {
			inputUrl: sanitizeResults.inputUrl,
			outputUrl: paramsResults.outputUrl,

			removedParams: totalParams,
			modified: totalParams.length > 0,
		},
	};
}
