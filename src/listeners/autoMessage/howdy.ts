import { Events, Listener } from "@sapphire/framework";
import { Message } from "discord.js";

export class HowdyListener extends Listener {
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
		if (message.author.bot) return;

		message.react("🤠");
	}
}
