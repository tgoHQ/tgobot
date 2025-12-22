import { Events, Listener } from "@sapphire/framework";
import { Message } from "discord.js";

export class FriendRequestMessageListener extends Listener {
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

		const regex = /friend request/;

		const isMatch = regex.test(message.content);
		if (!isMatch) return;

		await message.reply(
			"If you've recieved an unsolicited friend request from someone on this server who you don't know, please open a report with </tickets open:839848848003825673>. Once the ticket is created, send a screenshot and their discord username. **99% of the time, they are trying to scam people.** Please __**always**__ report these so the mods can prevent mass scams and spam happening on this server.",
		);
	}
}
