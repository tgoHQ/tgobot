import { Events, Listener } from "@sapphire/framework";
import env from "../../lib/util/env.js";
import OpenAI from "openai";
import {
	CHANNEL_ALPINE,
	CHANNEL_BIKING,
	CHANNEL_HIKING,
	CHANNEL_CAMPING,
	CHANNEL_CLIMBING,
	CHANNEL_INTRODUCTIONS,
	CHANNEL_NATURE,
	CHANNEL_ON_THE_WATER,
	CHANNEL_PHOTOS,
	CHANNEL_TRIP_REPORTS,
	CHANNEL_WINTER_SPORTS,
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
		if (message.channel !== (await CHANNEL_INTRODUCTIONS())) return;

		if (message.author.bot) return;

		if (message.content.length < 10) {
			message.delete();
			return;
		}

		message.react("👋");
		message.member?.roles.add(await ROLE_INTRODUCED());

		const openai = new OpenAI({
			apiKey: env.OPENAI,
		});

		const thread = await message.startThread({
			name: message.author.displayName,
		});

		thread.sendTyping();

		const response = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			temperature: 1.4,
			messages: [
				{
					role: "system",
					content: `
						A user is introducing theirself to our Discord community about the outdoors.
						Respond with a short paragraph welcoming them. Personalize the response based on what they said in their introduction.

						You can direct them to the appropriate channels for their interests. We have:

						${await CHANNEL_HIKING()} (hiking, backpacking, ultralight, thru-hiking)
						${await CHANNEL_CAMPING()} (frontcountry camping, car camping, boondocking, van life)
						${await CHANNEL_PHOTOS()} (sharing photos of the outdoors)
						${await CHANNEL_TRIP_REPORTS()} (trip reports)
						${await CHANNEL_ALPINE()} (mountaineering and alpine hiking)
						${await CHANNEL_BIKING()} (mountain biking and bike touring)
						${await CHANNEL_CLIMBING()} (rock climbing and bouldering)
						${await CHANNEL_NATURE()} (nature, wildlife, and foraging)
						${await CHANNEL_ON_THE_WATER()} (boating, kayaking, etc)
						${await CHANNEL_WINTER_SPORTS()} (winter sports - snowboarding, snowshoeing, etc)

						Do not list out the channels unless they are relevant to the user. Mention the channels using the tags provided.
					`,
				},
				{
					role: "user",
					content: message.content,
				},
			],
		});

		thread.send(response.choices[0].message.content!);
	}
}
