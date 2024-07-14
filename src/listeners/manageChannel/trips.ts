import { Events, Listener } from "@sapphire/framework";
import { EmbedBuilder, ThreadChannel } from "discord.js";
import { CHANNEL_TRIP_REPORTS } from "../../lib/discord/loadDiscordObjects.js";
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
		if (thread.parent !== (await CHANNEL_TRIP_REPORTS())) return; //if message not from meetups channel, return

		const member = await thread.fetchOwner();
		if (!member) return;

		await sleep(6000);

		thread.send({
			embeds: [
				new EmbedBuilder()
					.setTitle("Trips Channel")
					.setColor("#137c5a")
					.setDescription(
						`Use this thread to post your trip report or send updates while on the trail!

						A trip report can contain things such as:

						- Where did you go?
						- What happened while you were there?
						- What went well/poorly?
						- Lessons you learned on your trip
						- Photos, videos, or maps
						- A list of the gear you brought
						- The food/meals you had

						Once you've written your report, add one or more tags to describe the type of activity.

						For more info, see here: https://www.reddit.com/r/Ultralight/comments/hmiwh0/meta_how_to_write_a_trip_report/
			`.replaceAll("	", "")
					),
			],
			content: member.user!.toString(),
		});

		const post = await thread.fetchStarterMessage();
		await post?.react("🫘");
	}
}
