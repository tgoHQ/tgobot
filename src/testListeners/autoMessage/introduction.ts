import { Events, Listener } from "@sapphire/framework";
import env from "../../lib/util/env.js";
import OpenAI from "openai";
import {
	CHANNEL_INTRODUCTIONS,
	ROLE_INTRODUCED,
} from "../../lib/discord/loadDiscordObjects.js";
import { Message } from "discord.js";

export class IntroductionsAutoMessageListener extends Listener {
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
		if (message.channel !== CHANNEL_INTRODUCTIONS) return;

		if (message.author.bot) return;

		if (message.content.length < 10) {
			message.delete();
			return;
		}

		message.channel.sendTyping();
		message.react("👋");
		message.member?.roles.add(ROLE_INTRODUCED);

		const openai = new OpenAI({
			apiKey: env.OPENAI,
		});

		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content: `The user is introducing themself to our community about the outdoors. Respond and welcome them. Responses are less than 500 characters.`,
				},
				{
					role: "user",
					content: message.content,
				},
			],
		});

		if (!response.choices[0].message.content) return;

		await message.reply(response.choices[0].message.content);
	}
}
