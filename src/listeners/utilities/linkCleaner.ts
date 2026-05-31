import { Events, Listener } from "@sapphire/framework";
import { Message, MessageFlags } from "discord.js";

import { cleanLink } from "../../lib/linkCleaner/index.js";
import { linkCleanerResultsComponent } from "../../lib/linkCleaner/component.js";


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
				const result = await cleanLink(new URL(match));

				if (result.modified) {
					message.reply({
						flags: MessageFlags.IsComponentsV2,
						allowedMentions: { repliedUser: false },
						components: [
							linkCleanerResultsComponent(result),
						],
					});
				}
			}
		}
	}
}
