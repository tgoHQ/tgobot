//automatically publish all messages sent in a given array of announcement channels

import { Events, Listener } from "@sapphire/framework";

import { Message, NewsChannel } from "discord.js";

import {
	CHANNEL_MODLOG,
	CHANNEL_TOWN_HALL,
} from "../../lib/loadDiscordObjects.js";

export class AutoPublishListener extends Listener {
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
		const channels: NewsChannel[] = [
			await CHANNEL_MODLOG(),
			await CHANNEL_TOWN_HALL(),
		];

		channels.forEach((channel) => {
			if (channel === message.channel) {
				message.crosspost();
			}
		});
	}
}
