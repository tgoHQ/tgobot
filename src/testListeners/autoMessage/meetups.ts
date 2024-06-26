import { Events, Listener } from "@sapphire/framework";
import { EmbedBuilder, ThreadChannel } from "discord.js";
import { CHANNEL_MEETUPS } from "../../lib/discord/loadDiscordObjects.js";

export class MeetupsAutoMessageListener extends Listener {
	public constructor(
		context: Listener.LoaderContext,
		options: Listener.Options
	) {
		super(context, {
			...options,
			event: Events.ThreadCreate,
		});
	}

	public async run(thread: ThreadChannel) {
		if (thread.parent !== CHANNEL_MEETUPS) return; //if message not from meetups channel, return

		const member = await thread.fetchOwner();
		if (!member) return;

		const embed = new EmbedBuilder()
			.setTitle("Meetups Channel")
			.setColor("#137c5a")
			.setDescription(
				`
				Welcome to the Meetups channel! Please review the guidelines below.

				**It is your own responsibility to vet anyone you choose to meet up with and follow safe practices.** Ask your partners' permission before posting any photos of them on the server.

				You should include the following in your post:
				
				- The location of the trip, or your general location and the distance you're willing to travel
				- The activity or trip you would like to do
				- Your experience level
				- Date range
				- Apply the appropriate tags for region and activity type
				- Any other relevant details
			`.replaceAll("	", "")
			);

		thread.send({ embeds: [embed], content: member.user!.toString() });
	}
}
