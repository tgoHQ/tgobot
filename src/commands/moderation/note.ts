import { Command } from "@sapphire/framework";

import { PermissionFlagsBits } from "discord.js";
import { UserNote } from "../../lib/moderation/userNotes.js";
import { Emoji } from "../../lib/util/emoji.js";

export class NoteCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("note")
				.setDescription("Add a moderation note to a user")
				.addUserOption((option) =>
					option
						.setName("user")
						.setDescription("The user to add the note to")
						.setRequired(true),
				)
				.addStringOption((option) =>
					option
						.setName("content")
						.setDescription("The content of the note")
						.setRequired(true),
				)
				.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction,
	) {
		//get options
		const targetUser = interaction.options.getUser("user", true);
		const content = interaction.options.getString("content", true);
		const author = interaction.user;

		const note = await UserNote.create({
			targetUser,
			author,
			content,
		});

		//reply to the command
		interaction.reply({
			content: `${Emoji.True} Note created on <@${note.userId}> with ID \`${note.id}\`.\n\`\`\`${note.content}\`\`\``,
			allowedMentions: {},
		});
	}
}
