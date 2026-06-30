type CleanParamsOpts = {
	inputUrl: URL;
	badParams: string[];
};

/** the return type of the cleanParams function */
export type CleanParamsResult = {
	/** the original URL that was passed in */
	inputUrl: URL;
	/** the cleaned URL with bad parameters removed */
	outputUrl: URL;
	/** the list of bad parameters that were removed */
	removedParams: string[];
	/** whether or not the URL was changed by this step */
	modified: boolean;
};

/** removes bad parameters from a URL */
export function cleanParams({
	inputUrl,
	badParams,
}: CleanParamsOpts): CleanParamsResult {
	const outputUrl = new URL(inputUrl.toString());

	// match this url's parameters against the list of bad parameters
	const matchedParams = badParams.filter((badParam) => {
		return inputUrl.searchParams.has(badParam);
	});

	// remove the bad parameters from the url
	for (const param of matchedParams) {
		outputUrl.searchParams.delete(param);
	}

	return {
		inputUrl,
		outputUrl,
		removedParams: matchedParams,
		modified: inputUrl.toString() !== outputUrl.toString(),
	};
}
