/** the return type of the cleanParams function */
export type CleanParamsResult = {
	/** the original URL that was passed in */
	inputUrl: URL;
	/** the cleaned URL with bad parameters removed */
	outputUrl: URL;
	/** the list of bad parameters that were removed */
	removedParams: BadParam[];
	/** whether or not the URL was changed by this step */
	modified: boolean;
};

/** removes bad parameters from a URL */
export function cleanParams(url: URL): CleanParamsResult {
	const inputUrl = new URL(url.toString());

	/** match this url's parameters against the list of bad parameters */
	const matchedParams = badParams.filter((badParam) => {
		return url.searchParams.has(badParam.name);
	});

	/** remove the bad parameters from the url */
	for (const param of matchedParams) {
		url.searchParams.delete(param.name);
	}

	return {
		inputUrl,
		outputUrl: url,
		removedParams: matchedParams,
		modified: matchedParams.length > 0,
	};
}

type BadParam = {
	name: string;
	referenceUrl?: string;
};

/** the list of bad parameters that we want to remove */
const badParams: BadParam[] = [
	{
		name: "utm_source",
		referenceUrl: "https://en.wikipedia.org/wiki/UTM_parameters",
	},
	{
		name: "utm_medium",
		referenceUrl: "https://en.wikipedia.org/wiki/UTM_parameters",
	},
	{
		name: "utm_campaign",
		referenceUrl: "https://en.wikipedia.org/wiki/UTM_parameters",
	},
	{
		name: "utm_term",
		referenceUrl: "https://en.wikipedia.org/wiki/UTM_parameters",
	},
	{
		name: "utm_content",
		referenceUrl: "https://en.wikipedia.org/wiki/UTM_parameters",
	},
	{
		name: "ref",
	},
	{
		// amazon
		name: "ref_",
	},
	{
		// amazon
		name: "pd_rd_w",
	},
	{
		// amazon
		name: "content-id",
	},
	{
		// amazon
		name: "pf_rd_p",
	},
	{
		// amazon
		name: "pf_rd_r",
	},
	{
		// amazon
		name: "pd_rd_wg",
	},

	{
		//amazon
		name: "pd_rd_r",
	},
	{
		//amazon
		name: "psc",
	},
	{
		//amazon
		name: "smid",
	},
	{
		//amazon
		name: "pd_rd_i",
	},
	{
		//amazon
		name: "dib",
	},
	{
		//amazon
		name: "sp_csd",
	},
	{
		//amazon
		name: "dib_tag",
	},
	{
		// amazon
		name: "sprefix",
	},
	{
		// amazon
		name: "crid",
	},
	{
		// amazon
		name: "qid",
	},
	{
		// amazon
		name: "rsd",
	},
	{
		// amazon
		name: "sr",
	},
	{
		// amazon
		name: "social_share",
	},
	{
		// amazon
		name: "edk",
	},
	{
		//facebook
		name: "fbclid",
	},
	{
		//youtube
		name: "si",
	},
	{
		//instagram
		name: "igsh",
	},
];
