//automatically publish all messages sent in a given array of announcement channels

import { Events, Listener } from "@sapphire/framework";

import { Message, NewsChannel, Channel } from "discord.js";

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
		const channels: Channel[] = [
			// type the array as any kind of channel to make TS happy when doing the .inclues() below
			await CHANNEL_MODLOG(),
			await CHANNEL_TOWN_HALL(),
		] satisfies NewsChannel[]; //make sure we only put announcement channels here

		if (channels.includes(message.channel)) message.crosspost();
	}
}
