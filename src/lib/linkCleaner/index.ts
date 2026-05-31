import { cleanParams, CleanParamsResult } from "./params.js";
import { cleanPath, CleanPathResult } from "./path.js";
import { cleanRedirect, CleanRedirectResult } from "./redirect.js";

type CleanLinkResult = {
	cleanUrl: URL;
	redirect: CleanRedirectResult;
	path: CleanPathResult;
	params: CleanParamsResult;
};

export async function cleanLink(url: URL): Promise<CleanLinkResult> {
	const redirect = await cleanRedirect(url);
	const path = cleanPath(redirect.outputUrl);
	const params = cleanParams(path.outputUrl);

	const cleanUrl = params.outputUrl;

	return {
		cleanUrl,
		redirect,
		path,
		params,
	};
}
