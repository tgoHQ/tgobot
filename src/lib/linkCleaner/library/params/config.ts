/** the list of bad parameters that we want to remove */
export const badParams: string[] = [
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

	// google ads - can appear on any site
	"gad_campaignid",
	"gad_source",
];
