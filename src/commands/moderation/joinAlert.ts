import { Command } from "@sapphire/framework";
import { PermissionFlagsBits } from "discord.js";
import {
	createJoinAlert,
	deleteJoinAlert,
	getAllJoinAlerts,
	getJoinAlertByUser,
} from "#lib/moderation/joinAlert";
import { Emoji } from "#util/emoji";

export class JoinAlertCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName("joinalert")
				.setDescription("Manage users who trigger a mod alert when they join")
				.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
				.addSubcommand((sub) =>
					sub
						.setName("add")
						.setDescription("Alert mods if this user joins the server")
						.addUserOption((option) =>
							option
								.setName("user")
								.setDescription("The user to add a join alert for")
								.setRequired(true),
						)
						.addStringOption((option) =>
							option
								.setName("reason")
								.setDescription("Why this user should trigger an alert"),
						),
				)
				.addSubcommand((sub) =>
					sub
						.setName("remove")
						.setDescription("Stop alerting mods if this user joins the server")
						.addUserOption((option) =>
							option
								.setName("user")
								.setDescription("The user to remove the join alert for")
								.setRequired(true),
						),
				)
				.addSubcommand((sub) =>
					sub.setName("list").setDescription("List all active join alerts"),
				),
		);
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction,
	) {
		const subcommand = interaction.options.getSubcommand(true);

		switch (subcommand) {
			case "add":
				return this.add(interaction);
			case "remove":
				return this.remove(interaction);
			case "list":
				return this.list(interaction);
			default:
				throw new Error(`Unknown subcommand: ${subcommand}`);
		}
	}

	private async add(interaction: Command.ChatInputCommandInteraction) {
		const targetUser = interaction.options.getUser("user", true);
		const reason = interaction.options.getString("reason");

		const existing = await getJoinAlertByUser(targetUser.id);
		if (existing) {
			return interaction.reply({
				content: `${Emoji.False} <@${targetUser.id}> already has a join alert set by <@${existing.authorId}>${existing.reason ? `:\n\`\`\`${existing.reason}\`\`\`` : "."}`,
				allowedMentions: {},
			});
		}

		const joinAlert = await createJoinAlert({
			targetUser,
			author: interaction.user,
			reason,
		});

		return interaction.reply({
			content: `${Emoji.True} Join alert set on <@${joinAlert.userId}>.${joinAlert.reason ? `\n\`\`\`${joinAlert.reason}\`\`\`` : ""}`,
			allowedMentions: {},
		});
	}

	private async remove(interaction: Command.ChatInputCommandInteraction) {
		const targetUser = interaction.options.getUser("user", true);

		const joinAlert = await getJoinAlertByUser(targetUser.id);
		if (!joinAlert) {
			return interaction.reply({
				content: `${Emoji.False} <@${targetUser.id}> does not have a join alert set.`,
				allowedMentions: {},
			});
		}

		await deleteJoinAlert(joinAlert.id);

		return interaction.reply({
			content: `${Emoji.Delete} Join alert on <@${joinAlert.userId}> was removed.`,
			allowedMentions: {},
		});
	}

	private async list(interaction: Command.ChatInputCommandInteraction) {
		const joinAlerts = await getAllJoinAlerts();

		if (!joinAlerts.length) {
			return interaction.reply({
				content: `${Emoji.False} There are no active join alerts.`,
			});
		}

		const list = joinAlerts
			.map(
				(alert) =>
					`<@${alert.userId}> — added by <@${alert.authorId}> on <t:${Math.round(alert.createdAt.getTime() / 1000)}:D>${alert.reason ? `\n> ${alert.reason}` : ""}`,
			)
			.join("\n");

		return interaction.reply({
			content: `**Active Join Alerts (${joinAlerts.length})**\n${list}`,
			allowedMentions: {},
		});
	}
}
