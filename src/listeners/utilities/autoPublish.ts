//automatically publish all messages sent in a given array of announcement channels

import { Events, Listener } from "@sapphire/framework";

import { Message } from "discord.js";

import { CHANNEL_MODLOG } from "../../lib/discord/loadDiscordObjects.js";

export class AutoPublishListener extends Listener {
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
		const channels = [await CHANNEL_MODLOG()];

		channels.forEach((channel) => {
			if (channel === message.channel) {
				message.crosspost();
			}
		});
	}
}
