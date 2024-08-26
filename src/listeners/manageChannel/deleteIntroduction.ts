import { Events, Listener } from "@sapphire/framework";
import { CHANNEL_INTRODUCTIONS } from "../../lib/discord/loadDiscordObjects.js";
import { MessageReaction } from "discord.js";

export class IntroductionsDeleteReactionListener extends Listener {
	public constructor(
		context: Listener.LoaderContext,
		options: Listener.Options
	) {
		super(context, {
			...options,
			event: Events.MessageReactionAdd,
		});
	}

	public async run(reaction: MessageReaction) {
		if (reaction.message.channel !== (await CHANNEL_INTRODUCTIONS())) return;
		if (reaction.emoji.identifier !== "❌") return;
		//TODO check for staff role

		await reaction.message.thread?.delete();
		await reaction.message.delete();
	}
}
