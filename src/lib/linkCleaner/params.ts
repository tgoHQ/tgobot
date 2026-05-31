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
export function cleanParams(inputUrl: URL): CleanParamsResult {
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
		modified: matchedParams.length > 0,
	};
}

/** the list of bad parameters that we want to remove */
const badParams: string[] = [
	// amazon
	"pd_rd_w",
	"content-id",
	"pf_rd_p",
	"pf_rd_r",
	"pd_rd_wg",
	"pd_rd_r",
	"psc",
	"smid",
	"pd_rd_i",
	"dib",
	"sp_csd",
	"dib_tag",
	"sprefix",
	"crid",
	"qid",
	"rsd",
	"sr",
	"edk",
	"geniuslink",

	//facebook
	"fbclid",

	//youtube
	"si",
	"feature",

	//instagram
	"igsh",

	//google
	"kgmid",
	"source",
	"kgs",
	"shndl",
	"hl",

	//google maps
	"skid",
	"g_ep",
	"entry",
	"coh",
	"ftid",
	"lucs",
	"shh",
	"g_st",

	//shopify?
	"rfsn",
	"subid",

	//generic
	"coupon",
	"tag",
	"keywords",

	//epdiemic sound
	"_usx",
	"_us",
];
