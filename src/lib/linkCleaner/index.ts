import { cleanParams, CleanParamsResult } from "./params.js";
import { cleanPath, CleanPathResult } from "./path.js";

type CleanLinkResult = {
	cleanUrl: URL;
	params: CleanParamsResult;
	path: CleanPathResult;
};

export function cleanLink(url: URL): CleanLinkResult {
	const params = cleanParams(url);
	const path = cleanPath(params.outputUrl);

	const cleanUrl = path.outputUrl;

	return {
		cleanUrl,
		params,
		path,
	};
}
