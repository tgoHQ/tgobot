import { Events, Listener } from "@sapphire/framework";
import { MessageFlags, TextDisplayBuilder, ThreadChannel } from "discord.js";
import { CHANNEL_MEETUPS } from "../../lib/discord/loadDiscordObjects.js";
import { sleep } from "@sapphire/utilities";
import { removeTabs } from "../../lib/util/removeTabs.js";

export class MeetupsAutoMessageListener extends Listener {
	public constructor(
		context: Listener.LoaderContext,
		options: Listener.Options,
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

		const components = [
			new TextDisplayBuilder().setContent(
				removeTabs(
					`
				Thanks for posting, ${member.user}! Please remember:

				- **Always be safe and vet anyone you choose to meet up with!**
				- **Posts that are missing information will be deleted!**
				- Your post should include:
				  - Destination of the trip, or your general location and travel radius
				  - The type of activity
				  - Your experience level
				  - A date or date range
				  - The appropriate tags for region and activity type
			`,
				),
			),
		];

		thread.send({ components, flags: MessageFlags.IsComponentsV2 });
	}
}
