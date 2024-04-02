import env from "../../lib/env.js";
import { Events } from "discord.js";
import type { Event } from "../index.js";
import OpenAI from "openai";
import { CHANNEL_INTRODUCTIONS, ROLE_INTRODUCED } from "../../lib/loadDiscordObjects.js";

export default {
	name: Events.MessageCreate,
	async execute(message) {
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
	},
} satisfies Event<Events.MessageCreate>;
