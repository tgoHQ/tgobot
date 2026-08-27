import { Listener } from "@sapphire/framework";

import {
	ContainerBuilder,
	Events,
	MessageFlags,
	TextDisplayBuilder,
	type MessageReaction,
	type PartialMessageReaction,
	type PartialUser,
	type User,
} from "discord.js";
import { env } from "../../env.js";
import { CHANNEL_LOG } from "../../lib/loadDiscordObjects.js";
import { colors } from "../../util/colors.js";
import { removeTabs } from "../../util/removeTabs.js";

/**
 * Reactions on messages that predate the current session arrive partial, so both
 * the reaction and the user have to be filled in before anything can be logged.
 * Returns null when the message is gone or otherwise can't be resolved.
 */
async function resolveReaction(
	reaction: MessageReaction | PartialMessageReaction,
	user: User | PartialUser,
) {
	try {
		const fullReaction = reaction.partial ? await reaction.fetch() : reaction;
		const fullUser = user.partial ? await user.fetch() : user;
		const message = fullReaction.message.partial
			? await fullReaction.message.fetch()
			: fullReaction.message;

		if (message.guild?.id !== env.GUILD_ID) return null; //if reaction is not from main guild, ignore
		if (fullUser.bot) return null; //if the reactor is a bot, ignore
		if (message.channel === (await CHANNEL_LOG())) return null; //don't log reactions on the log channel itself

		return { reaction: fullReaction, user: fullUser, message };
	} catch {
		//message was deleted, or is otherwise unfetchable
		return null;
	}
}

export class MessageReactionAddListener extends Listener {
	public constructor(
		context: Listener.LoaderContext,
		options: Listener.Options,
	) {
		super(context, {
			...options,
			name: "messageReactionAddLogger",
			event: Events.MessageReactionAdd,
		});
	}

	public async run(
		reaction: MessageReaction | PartialMessageReaction,
		user: User | PartialUser,
	) {
		const resolved = await resolveReaction(reaction, user);
		if (!resolved) return;

		const component = new ContainerBuilder()
			.addTextDisplayComponents([
				new TextDisplayBuilder().setContent(
					removeTabs(`
				## [Reaction Added](${resolved.message.url})
				${resolved.user} reacted with ${resolved.reaction.emoji} to a message by ${resolved.message.author} in ${resolved.message.channel}.
				### Content
				${resolved.message.content.slice(0, 1024) || "Message did not contain text (embed or media)."}
			`),
				),
			])
			.setAccentColor(colors.staffGreen.decimal);

		await (
			await CHANNEL_LOG()
		).send({
			components: [component],
			flags: [MessageFlags.IsComponentsV2],
			allowedMentions: {},
		});
	}
}

export class MessageReactionRemoveListener extends Listener {
	public constructor(
		context: Listener.LoaderContext,
		options: Listener.Options,
	) {
		super(context, {
			...options,
			name: "messageReactionRemoveLogger",
			event: Events.MessageReactionRemove,
		});
	}

	public async run(
		reaction: MessageReaction | PartialMessageReaction,
		user: User | PartialUser,
	) {
		const resolved = await resolveReaction(reaction, user);
		if (!resolved) return;

		const component = new ContainerBuilder()
			.addTextDisplayComponents([
				new TextDisplayBuilder().setContent(
					removeTabs(`
				## [Reaction Removed](${resolved.message.url})
				${resolved.user} removed their ${resolved.reaction.emoji} reaction from a message by ${resolved.message.author} in ${resolved.message.channel}.
				### Content
				${resolved.message.content.slice(0, 1024) || "Message did not contain text (embed or media)."}
			`),
				),
			])
			.setAccentColor(colors.red.decimal);

		await (
			await CHANNEL_LOG()
		).send({
			components: [component],
			flags: [MessageFlags.IsComponentsV2],
			allowedMentions: {},
		});
	}
}
