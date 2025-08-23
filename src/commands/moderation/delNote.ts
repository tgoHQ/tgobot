import { Command } from "@sapphire/framework";

import { PermissionFlagsBits } from "discord.js";
import { UserNote } from "../../lib/moderation/userNotes.js";
import { Emoji } from "../../lib/util/emoji.js";

export class DelNoteCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("delnote")
				.setDescription("Delete a moderation note")
				.addNumberOption((option) =>
					option
						.setName("id")
						.setDescription("The ID of the note to delete")
						.setRequired(true),
				)
				.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction,
	) {
		const id = interaction.options.getNumber("id", true);

		const note = await UserNote.getById(id);

		if (!note)
			return interaction.reply({
				content: `${Emoji.False} No note found with ID \`${id}\`.`,
			});

		await note.delete();

		//reply to the command
		return interaction.reply({
			content: `${Emoji.Delete} Note on <@${note.userId}> with ID \`${note.id}\` was deleted.\n\`\`\`${note.content}\`\`\``,
			allowedMentions: {},
		});
	}
}
