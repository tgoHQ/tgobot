import { Command } from "@sapphire/framework";
import { ROLE_BOOSTER_COSMETIC, GUILD } from "../../lib/loadDiscordObjects.js";

export class BoosterOptionsCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("boosteroptions")
				.setDescription("manage your server booster options")
				.addBooleanOption((option) =>
					option
						.setName("cosmetics")
						.setDescription(
							"set false if you want to hide the cosmetic booster effects with color, icon, and sidebar hoist",
						)
						.setRequired(true),
				);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction,
	) {
		const wantsCosmeticRole = interaction.options.getBoolean("cosmetics", true);

		const cosmeticRole = await ROLE_BOOSTER_COSMETIC();

		const member = await (await GUILD()).members.fetch(interaction.user.id);

		const currentlyHasCosmeticRole = member.roles.cache.has(cosmeticRole.id);

		if (wantsCosmeticRole && !currentlyHasCosmeticRole) {
			await member.roles.add(cosmeticRole);
		}

		if (!wantsCosmeticRole && currentlyHasCosmeticRole) {
			await member.roles.remove(cosmeticRole);
		}

		interaction.reply(
			`Your cosmetic effects were turned ${wantsCosmeticRole ? "on" : "off"}. Thank you for supporting TGO!`,
		);
	}
}
