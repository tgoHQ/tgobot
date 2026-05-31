/** the return type of the cleanPath function */
export type CleanPathResult = {
	/** the original URL that was passed in */
	inputUrl: URL;
	/** the cleaned URL with bad segments removed */
	outputUrl: URL;
	/** the list of bad segments that were removed */
	removedSegments: string[];
	/** whether or not the URL was changed by this step */
	modified: boolean;
};

/** removes bad path segments from a URL */
export function cleanPath(url: URL): CleanPathResult {
	const inputUrl = new URL(url.toString());

	const segments = url.pathname.split("/").filter(Boolean);

	console.log(segments);

	/** match this url's segments against the list of bad segments */
	const matchedSegments = segments.filter((segment) => {
		return badSegments.some((badSegment) => {
			return badSegment.regex.test(segment);
		});
	});

	console.log(matchedSegments);

	for (const segment of matchedSegments) {
		url.pathname = url.pathname.replace(segment, "");
	}

	console.log(url.pathname);

	console.log(url);

	const result = {
		inputUrl,
		outputUrl: url,
		removedSegments: matchedSegments,
		modified: matchedSegments.length > 0,
	};

	console.log(result);

	return result;
}

type BadSegment = {
	regex: RegExp;
	referenceUrl?: string;
};

/** the list of bad path segments that we want to remove */
const badSegments: BadSegment[] = [
	{
		//amazon
		regex: /ref=.+/,
	},
];
