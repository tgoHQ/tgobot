import { Command } from "@sapphire/framework";

import { PermissionFlagsBits } from "discord.js";

export class MessageCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
    });
  }
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) => {
      builder
        .setName("message")
        .setDescription("Sends a message as the bot.")
        .addStringOption((option) =>
          option
            .setName("content")
            .setDescription("The message to be sent.")
            .setRequired(true),
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);
    });
  }

  public override async chatInputRun(
    interaction: Command.ChatInputCommandInteraction,
  ) {
    if (!interaction.channel?.isSendable()) {
      return interaction.reply({
        content: "Cannot send message.",
        ephemeral: true,
      });
    }

    const content = interaction.options.getString("content", true);

    const message = await interaction.channel.send(content);

    return await interaction.reply({ content: message.url, ephemeral: true });
  }
}
