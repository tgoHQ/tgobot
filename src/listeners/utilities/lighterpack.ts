//display a preview in chat of lighterpack links

//detect links
//spin up browser
//take screenshot
//send in chat

import { Events, Listener } from "@sapphire/framework";

import { Message } from "discord.js";

export class LighterpackAutoMessageListener extends Listener {
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
		// check if member is a bot
		if (message?.member?.user.bot) return;

		//check if link is lighterpack
		const link = /\bhttps?:\/\/lighterpack.com\/r\/[a-zA-Z0-9]{6}\b/.exec(
			message.content,
		);
		if (!link) return;
	}
}
