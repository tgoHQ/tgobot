import { Events, Listener } from "@sapphire/framework";
import { Message, MessageFlags, SeparatorSpacingSize } from "discord.js";

import { cleanLink } from "../../lib/linkCleaner/index.js";
import { TextDisplayBuilder, SeparatorBuilder } from "discord.js";
import { removeTabs } from "../../util/removeTabs.js";

export class LinkListener extends Listener {
	public constructor(
		context: Listener.LoaderContext,
		options: Listener.Options,
	) {
		super(context, {
			...options,
			event: Events.MessageCreate,
		});
	}

	public async run(message: Message) {
		if (message.author.bot) return;

		const linkRe = /https?:\/\/\S+\.\S+/g;

		const matches = message.content.match(linkRe);

		if (matches) {
			for (const match of matches) {
				const url = new URL(match);
				const result = await cleanLink(url);

				if (result.cleanUrl.toString() !== new URL(match).toString()) {
					message.reply({
						flags: MessageFlags.IsComponentsV2,
						allowedMentions: { repliedUser: false },
						components: [
							new TextDisplayBuilder().setContent(
								removeTabs(
									`I cleaned up this link for you to remove invasive tracking information!
								${result.cleanUrl}`,
								),
							),
							new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small),

							...(result.redirect.modified
								? [
										new TextDisplayBuilder().setContent(`
											-# Followed redirect to: \`${result.redirect.outputUrl.toString()}\`
										`),
									]
								: []),
							...(result.path.modified
								? [
										new TextDisplayBuilder().setContent(`
											-# Removed path segments: ${result.path.removedSegments
												.map((segment) => "`" + segment + "`")
												.join(", ")}
										`),
									]
								: []),
							...(result.params.modified
								? [
										new TextDisplayBuilder().setContent(`
											-# Removed query parameters: ${result.params.removedParams
												.map((param) => {
													if (param.referenceUrl) {
														return `[\`${param.name}\`](${param.referenceUrl})`;
													}
													return `\`${param.name}\``;
												})
												.join(", ")}
										`),
									]
								: []),
						],
					});
				}
			}
		}
	}
}
