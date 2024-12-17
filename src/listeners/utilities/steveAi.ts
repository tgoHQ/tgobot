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

export class SteveAiMessageListener extends Listener {
	public constructor(
		context: Listener.LoaderContext,
		options: Listener.Options
	) {
		super(context, {
			...options,
			event: Events.MessageCreate,
		});
	}

	public async run(message: Message) {
		// ignore messages from bots
		if (message?.member?.user.bot) return;

		// check if the message tags steve
		const steveTag = message.mentions.users.has(message.client.user?.id);

		if (!steveTag) return;

		console.log("Steve tag detected");

		let context: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming["messages"] =
			[];
		let currentMessage = message;

		// check up the reply chain for context
		while (true) {
			const replyInfo = currentMessage.reference;
			if (!replyInfo?.messageId) break;

			//use the client to fetch the reply message from id
			const replyChannel = currentMessage.client.channels.cache.get(
				replyInfo.channelId
			) as TextChannel | undefined;
			if (!replyChannel) break;
			const replyMessage = await replyChannel.messages.fetch(
				replyInfo.messageId
			);

			const messageIsFromBot =
				replyMessage.author.id === message.client.user?.id;

			context.push({
				role: messageIsFromBot ? "assistant" : "user",
				content: replyMessage.content,
				name: `${
					replyMessage.author.username.replaceAll(".", "-").replaceAll(" ", "-")
				}`,
			});
			currentMessage = replyMessage;
		}

		const completion = await steveAi(context);

		await message.reply(completion);
	}
}
