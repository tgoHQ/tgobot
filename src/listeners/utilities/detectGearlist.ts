import { Events, Listener } from "@sapphire/framework";
import { Message } from "discord.js";

export class DetectGearlistListener extends Listener {
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

		const lighterpackRE = /\bhttps?:\/\/lighterpack.com\/r\/[a-zA-Z0-9]{6}\b/;

		//check if link is lighterpack
		const isMatch = lighterpackRE.test(message.content);
		if (!isMatch) return;
	}
}
