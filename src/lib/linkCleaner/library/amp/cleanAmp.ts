import z from "zod";

/** the return type of the cleanAmp function */
export type AmpResult = {
	/** the original URL that was passed in */
	inputUrl: URL;
	/** the cleaned URL with bad parameters removed */
	outputUrl: URL;
	/** whether or not the URL was changed by this step */
	modified: boolean;
};

/** de-amps amp links using the amputatorbot API */
export async function cleanAmp(inputUrl: URL): Promise<AmpResult> {
	// https://www.amputatorbot.com/api/docs#v2/tag/convert/POST/api/v2/convert
	const response = await fetch("https://www.amputatorbot.com/api/v2/convert", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: inputUrl.toString(),
			guessAndCheck: false,
			generateMarkdownComment: false,
		}),
	});

	// no amp detected
	if (response.status === 406) {
		return {
			inputUrl,
			outputUrl: inputUrl,
			modified: false,
		};
	}

	// something went wrong
	if (!response.ok) {
		console.log(response.status);
		console.log(response.statusText);
		console.log(await response.json());
		return {
			inputUrl,
			outputUrl: inputUrl,
			modified: false,
		};
	}

	// parse the response
	const json = amputatorSchema.parse(await response.json());
	const result = json.links[0]!.canonical?.url;
	// if this is an amp link, but no canonical url was found, return the input url
	const outputUrl = result ? new URL(result) : inputUrl;

	return {
		inputUrl,
		outputUrl,
		modified: inputUrl.toString() !== outputUrl.toString(),
	};
}

/** zod schema for the amputatorbot API response */
const amputatorSchema = z.object({
	links: z.array(
		z.object({
			canonical: z
				.object({
					url: z.url(),
				})
				.nullable(),
		}),
	),
});
