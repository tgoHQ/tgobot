//listen for new messages
//ignore messages from bots
//check if the message tags steve or replies to a previous ai invocation
//check up the reply chain for context
//send the message to the ai
//reply

import { Events, Listener } from "@sapphire/framework";

import { Message, TextChannel } from "discord.js";
import { type OpenAI } from "openai";
import { steveAi } from "../../lib/steveAi.js";
import env from "../../lib/util/env.js";

export class SteveAiMessageListener extends Listener {
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
		// check if the message tags steve
		const steveTag = message.mentions.users.has(message.client.user?.id);
		if (!steveTag) return;

		// ignore messages from bots
		if (message?.member?.user.bot) return;

		//ignore if they don't have access
		const allowedToUse = message.member?.roles.cache.some(
			(role) =>
				role.id === env.ROLE_MODERATOR_ID ||
				role.id === env.ROLE_EXPERT_ID ||
				role.id === env.ROLE_BOOSTER_ID,
		);

		if (!allowedToUse) {
			await message.reply(
				"You don't have access to use this command! You can boost the server to gain access.",
			);
			return;
		}

		let context: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming["messages"] =
			[];
		let currentMessage = message;

		// check up the reply chain for context
		while (true) {
			const messageIsFromBot =
				currentMessage.author.id === message.client.user?.id;

			context.push({
				role: messageIsFromBot ? "assistant" : "user",
				content: currentMessage.content,
				name: `${currentMessage.author.username
					.replaceAll(".", "-")
					.replaceAll(" ", "-")}`,
			});

			const replyInfo = currentMessage.reference;
			if (!replyInfo?.messageId) break;

			const replyChannel = currentMessage.client.channels.cache.get(
				replyInfo.channelId,
			) as TextChannel | undefined;
			if (!replyChannel) break;
			//current message is now the reply
			currentMessage = await replyChannel.messages.fetch(replyInfo.messageId);
		}

		const completion = await steveAi(context.reverse());

		await message.reply(completion);
	}
}
