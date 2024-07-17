import { Events, Listener } from "@sapphire/framework";

import { Message } from "discord.js";
import {
	CHANNEL_NATURE,
	CHANNEL_PHOTOS,
} from "../../lib/discord/loadDiscordObjects.js";

export class NatureAutoMessageListener extends Listener {
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
		if (message.channel !== (await CHANNEL_NATURE())) return; //if message not from photos channel, return

		if (message?.attachments.size >= 3) {
			await message.reply(`
				Thanks for posting! This channel is intended mainly for text discussion about nature. Please use ${await CHANNEL_PHOTOS()} instead for posting nature photography.
			`);
		}
	}
}
