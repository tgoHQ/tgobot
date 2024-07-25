import { Events, Listener } from "@sapphire/framework";
import { EmbedBuilder, ThreadChannel } from "discord.js";
import { CHANNEL_MEETUPS } from "../../lib/discord/loadDiscordObjects.js";
import { sleep } from "@sapphire/utilities";

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
		if (thread.parent !== (await CHANNEL_MEETUPS())) return; //if message not from meetups channel, return

		const member = await thread.fetchOwner();
		if (!member) return;

		await sleep(6000);

		const embed = new EmbedBuilder()
			.setTitle("Meetups Channel")
			.setColor("#137c5a")
			.setDescription(
				`Thanks for posting! Please review the guidelines below.

				**Always remember to be safe and vet anyone you choose to meet up with!**

				You should include the following in your post:
				
				- Location of the trip, or your general area and travel radius
				- The type of activity or trip
				- Your experience level
				- A date or range of dates
				- Apply the appropriate tags for region and activity type
			`.replaceAll("	", "")
			);

		thread.send({ embeds: [embed], content: member.user!.toString() });
	}
}
