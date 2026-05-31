import { Events, Listener } from "@sapphire/framework";
import { Message, MessageFlags, SeparatorSpacingSize } from "discord.js";

import { cleanLink } from "../../lib/linkCleaner/index.js";
import { TextDisplayBuilder, SeparatorBuilder } from "discord.js";

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
				const result = cleanLink(url);

				if (result.cleanUrl.toString() !== new URL(match).toString()) {
					message.reply({
						flags: MessageFlags.IsComponentsV2,
						allowedMentions: { repliedUser: false },
						components: [
							new TextDisplayBuilder().setContent(result.cleanUrl.toString()),
							new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small),
							new TextDisplayBuilder().setContent(`
								-# I cleaned up this link for you to remove tracking information! Here's what I took out:
							`),
							...(result.params.modified
								? [
										new TextDisplayBuilder().setContent(`
											-# Query parameters: ${result.params.removedParams
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

							...(result.path.modified
								? [
										new TextDisplayBuilder().setContent(`
											-# Path segments: ${result.path.removedSegments
												.map((segment) => "`" + segment + "`")
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
