import { Listener } from "@sapphire/framework";
import { env } from "../../env.js";
import {
	Message,
	ContainerBuilder,
	TextDisplayBuilder,
	MessageFlags,
} from "discord.js";
import { CHANNEL_LOG } from "../../lib/loadDiscordObjects.js";
import { colors } from "../../util/colors.js";
import { removeTabs } from "../../util/removeTabs.js";

export class MessageUpdateListener extends Listener {
	public async run(oldMessage: Message, newMessage: Message) {
		if (newMessage.guild?.id != env.GUILD_ID) return; //if message edited is not from main guild, return
		if (newMessage.author?.bot) return; //if message edited is from a bot, return

		if (oldMessage.content === newMessage.content) return; //if text content of message hasn't changed, return
		if (!oldMessage.content || !newMessage.content) return; //if messages don't have content, return

		const component = new ContainerBuilder()
			.addTextDisplayComponents([
				new TextDisplayBuilder().setContent(
					removeTabs(`
				## [Message Edited](${newMessage.url})
				Message edited by ${newMessage.author} in ${newMessage.channel}.
				### Before
				${oldMessage.content}
				### After
				${newMessage.content}
			`),
				),
			])
			.setAccentColor(colors.blue.decimal);

		(await CHANNEL_LOG()).send({
			components: [component],
			flags: [MessageFlags.IsComponentsV2],
			allowedMentions: {},
		});
	}
}
