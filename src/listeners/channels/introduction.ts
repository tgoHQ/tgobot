import { Events, Listener } from "@sapphire/framework";
import {
	CHANNEL_INTRODUCTIONS,
	ROLE_INTRODUCED,
} from "../../lib/loadDiscordObjects.js";
import { Message } from "discord.js";
import { removeTabs } from "../../util/removeTabs.js";
import { chatbot } from "../../lib/llm/chatbot.js";

export class IntroductionsAutoMessageListener extends Listener {
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
		if (message.channel !== (await CHANNEL_INTRODUCTIONS())) return;

		if (message.author.bot) return;

		const minCharacters = 10;

		if (message.content.length < minCharacters) {
			message.delete();

			try {
				await message.author.send(
					`Introduction messages must be at least ${minCharacters} characters long! Your message was: \n\`\`\`${message.content}\`\`\``,
				);
			} catch {}

			return;
		}

		message.react("👋");
		message.member?.roles.add(await ROLE_INTRODUCED());

		const thread = await message.startThread({
			name: message.author.displayName,
		});

		thread.sendTyping();

		const { text } = await chatbot({
			instructions: removeTabs(`
				The user just sent their introduction message.
				Respond with a short paragraph welcoming them. Personalize the response based on what they said in their introduction.
				You can direct them to the appropriate channels for their interests. Do not list out the channels unless they are relevant to the user.
			`),
			currentChannel: message.channel,
			messages: [{ role: "user", content: message.content }],
		});

		thread.send(
			removeTabs(`
				${text}
				-# I am a bot.
			`),
		);
	}
}
