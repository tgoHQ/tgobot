// import env from "../../lib/util/env.js";
// import {
// 	Events,
// 	ActionRowBuilder,
// 	ButtonBuilder,
// 	ButtonStyle,
// 	MessageActionRowComponentBuilder,
// 	ModalBuilder,
// 	TextInputBuilder,
// 	ModalActionRowComponentBuilder,
// 	TextInputStyle,
// 	ComponentType,
// } from "discord.js";
// import type { Event } from "../index.js";
// import db from "../../lib/db/drizzle.js";
// import { gearLists } from "../../lib/db/schema.js";
// import getDuration from "../../lib/util/getDuration.js";

// export default {
// 	name: Events.MessageCreate,

// 	async execute(message) {
// 		//if message not from main guild, return
// 		if (message.guild?.id !== env.GUILD_ID) return;

// 		//if message does not contain a link, ignore
// 		const linkRE = /https?:\/\/.{2,}/;
// 		if (!linkRE.test(message.content)) {
// 			return;
// 		}

// 		//fetch the GuildMember
// 		const member = await message.guild.members.fetch(message.author);

// 		//if member is a bot, ignore
// 		if (member.user.bot) return;

// 		//check if link is lighterpack
// 		const lighterpackRE = /\bhttps?:\/\/lighterpack.com\/r\/[a-zA-Z0-9]{6}\b/;
// 		const exec = lighterpackRE.exec(message.content);
// 		if (!exec) return;

// 		//if this link is already saved to a user, ignore
// 		if (
// 			await db.query.gearLists.findFirst({
// 				where: (gearLists, { eq }) => eq(gearLists.url, exec[0]),
// 			})
// 		) {
// 			return;
// 		}

// 		const buttonRow =
// 			new ActionRowBuilder<MessageActionRowComponentBuilder>().setComponents(
// 				new ButtonBuilder()
// 					.setLabel("Save")
// 					.setStyle(ButtonStyle.Primary)
// 					.setCustomId("save")
// 			);

// 		const response = await message.reply({
// 			content: `Would you like to save this gear list to your profile?`,
// 			components: [buttonRow],
// 		});

// 		const modal = new ModalBuilder()
// 			.setTitle("Save Gear List")
// 			.setCustomId("saveGearListModal")
// 			.addComponents(
// 				new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
// 					new TextInputBuilder()
// 						.setCustomId("listTitle")
// 						.setLabel("List Name")
// 						.setRequired(true)
// 						.setStyle(TextInputStyle.Short)
// 				),
// 				new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
// 					new TextInputBuilder()
// 						.setCustomId("listUrl")
// 						.setLabel("List URL")
// 						.setRequired(true)
// 						.setStyle(TextInputStyle.Short)
// 						.setValue(exec[0])
// 				)
// 			);

// 		try {
// 			const buttonInteraction =
// 				await response.awaitMessageComponent<ComponentType.Button>({
// 					filter: (i) => i.user === member.user,
// 					time: getDuration.hours(12),
// 				});

// 			await buttonInteraction.showModal(modal);

// 			const modalInteraction = await buttonInteraction.awaitModalSubmit({
// 				time: getDuration.hours(12),
// 			});
// 			await modalInteraction.deferUpdate();

// 			const url = modalInteraction.fields.getTextInputValue("listUrl");
// 			const title = modalInteraction.fields.getTextInputValue("listTitle");

// 			const row = (
// 				await db
// 					.insert(gearLists)
// 					.values({
// 						name: title,
// 						url,
// 						discordUserId: member.user.id,
// 					})
// 					.returning()
// 			)[0];

// 			await buttonInteraction.editReply({
// 				content: `Saved as \`${row.name}\`!`,
// 				components: [],
// 			});
// 		} catch {
// 			throw new Error(
// 				"something weird happened with the gearlistlink listener"
// 			);
// 		}
// 	},
// } satisfies Event<Events.MessageCreate>;

// //todo rewrite this and make it less of a mess
