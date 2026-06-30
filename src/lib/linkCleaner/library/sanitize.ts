import { clearurlsCatalog } from "@url-sanitize/clearurls";
import { compileSanitizer } from "@url-sanitize/core";

/** the return type of the sanitizeUrl function */
export type SanitizeResult = {
	/** the original URL that was passed in */
	inputUrl: URL;
	/** the cleaned URL with bad parameters removed */
	outputUrl: URL;
	/** the list of bad parameters that were removed */
	removedParams: string[];
	/** whether or not the URL was changed by this step */
	modified: boolean;
};

/** sanitizes a URL */
export function sanitizeUrl(inputUrl: URL): SanitizeResult {
	// instantiate the sanitizer
	const sanitize = compileSanitizer(clearurlsCatalog, {
		domainBlocking: false,
	});

	// sanitize the url
	const results = sanitize(inputUrl.toString());

	// ceremonial code for the return type
	if (results.kind === "blocked") {
		throw new Error("link sanitizer blocked the link");
	}

	if (results.kind === "cleaned") {
		return {
			inputUrl,
			outputUrl: new URL(results.url),
			removedParams: results.strippedParams,
			modified: results.strippedParams.length > 0,
		};
	}

	return {
		inputUrl,
		outputUrl: inputUrl,
		removedParams: [],
		modified: inputUrl.toString() !== inputUrl.toString(),
	};
}
