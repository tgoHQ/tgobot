import { CleanLinkResult } from "./index.js";

import {
	ContainerBuilder,
	TextDisplayBuilder,
	SeparatorBuilder,
	SeparatorSpacingSize,
} from "discord.js";
import { colors } from "../../util/colors.js";
import { removeTabs } from "../../util/removeTabs.js";

export function linkCleanerResultsComponent(result: CleanLinkResult) {
	return new ContainerBuilder()
		.setAccentColor(colors.staffGreen.decimal)
		.addTextDisplayComponents(
			new TextDisplayBuilder().setContent(
				removeTabs(`
				### ${result.outputUrl.toString()}
			`),
			),
		)
		.addSeparatorComponents(
			new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small),
		)
		.addTextDisplayComponents(
			new TextDisplayBuilder().setContent(
				"Removed tracking information from this link.",
			),
			...(result.redirect.modified
				? [
						new TextDisplayBuilder().setContent(`
							-# Followed redirect to: \`${result.redirect.outputUrl.toString()}\`
						`),
					]
				: []),

			...(result.sanitize.modified
				? [
						new TextDisplayBuilder().setContent(`
							-# Removed query parameters: ${result.sanitize.removedParams
								.map((param) => `\`${param}\``)
								.join(", ")}
						`),
					]
				: []),
		);
}
