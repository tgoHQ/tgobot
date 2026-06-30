import { cleanRedirect, type CleanRedirectResult } from "clean-links";
import { cleanAmp, type AmpResult } from "./library/amp/cleanAmp.js";
import { sanitizeUrl, type SanitizeResult } from "./library/sanitize.js";
import { cleanParams } from "./library/params/cleanParams.js";
import { badParams } from "./library/params/config.js";

/** the return type of the cleanLink function */
export type CleanLinkResult = {
	inputUrl: URL;
	outputUrl: URL;
	modified: boolean;
	redirect: CleanRedirectResult;
	amp: AmpResult;
	sanitize: SanitizeResult;
};

/** cleans a URL */
export async function cleanLink(inputUrl: URL): Promise<CleanLinkResult> {
	const amp = await cleanAmp(inputUrl);

	const redirect = await cleanRedirect({
		inputUrl: amp.outputUrl,
		exceptions: {
			prebuiltExceptors: {
				ignoredHostnames: ["tenor.com", "discordapp.com"],
				ignoreWww: true,
				ignoreTrailingSlash: true,
				ignoreHttps: true,
			},
		},
	});

	const sanitizeResults = sanitizeUrl(redirect.outputUrl);

	const paramsResults = cleanParams({
		inputUrl: new URL(sanitizeResults.outputUrl),
		badParams,
	});

	const totalParams = sanitizeResults.removedParams.concat(
		paramsResults.removedParams,
	);

	return {
		inputUrl,
		outputUrl: paramsResults.outputUrl,
		modified: inputUrl.toString() !== paramsResults.outputUrl.toString(),

		redirect,
		amp,
		sanitize: {
			inputUrl: sanitizeResults.inputUrl,
			outputUrl: paramsResults.outputUrl,

			removedParams: totalParams,
			modified: totalParams.length > 0,
		},
	};
}
