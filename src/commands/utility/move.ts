import { Command } from "@sapphire/framework";
import { PermissionFlagsBits, ChannelType } from "discord.js";

export class MoveCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("move")
				.setDescription("Move a conversation to another channel.")
				.addChannelOption((option) =>
					option
						.setName("channel")
						.setDescription("Channel to move to")
						.setRequired(true)
						.addChannelTypes(
							ChannelType.GuildText,
							ChannelType.GuildStageVoice,
							ChannelType.AnnouncementThread,
							ChannelType.PublicThread,
							ChannelType.GuildVoice
						)
				)
				.addStringOption((option) =>
					option
						.setName("topic")
						.setDescription(
							"The topic of the conversation being moved."
						)
						.setRequired(true)
				)
				.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction
	) {

		const interactionResponse = await interaction.deferReply();

		const responseURL = (await interactionResponse.fetch()).url

		const newChannel = interaction.options.getChannel("channel", true, [
			ChannelType.GuildText,
			ChannelType.GuildAnnouncement,
			ChannelType.GuildStageVoice,
			ChannelType.AnnouncementThread,
			ChannelType.PublicThread,
			ChannelType.GuildVoice,
		]);

		const newChannelMessage = await newChannel.send(`The conversation about \`${interaction.options.getString("topic", true)}\` has been moved here from ${responseURL}.`);


		interaction.editReply(
			`The conversation about \`${interaction.options.getString("topic", true)}\` has been moved to ${newChannelMessage.url}.`
		);
	}
}
