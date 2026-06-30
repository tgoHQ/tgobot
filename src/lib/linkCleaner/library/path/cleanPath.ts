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
	const outputUrl = new URL(url.toString());

	const segments = inputUrl.pathname.split("/").filter(Boolean);

	/** match this url's segments against the list of bad segments */
	const matchedSegments = segments.filter((segment) => {
		return badSegments.some((badSegment) => {
			return badSegment.regex.test(segment);
		});
	});

	for (const segment of matchedSegments) {
		outputUrl.pathname = outputUrl.pathname.replace(segment, "");
	}

	const result = {
		inputUrl,
		outputUrl,
		removedSegments: matchedSegments,
		modified: matchedSegments.length > 0,
	};

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
	{
		//google maps
		regex: /data=.+/,
	},
];
