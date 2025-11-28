import { EmbedBuilder, User } from "discord.js";
import db from "../../db/drizzle.js";
import { colors } from "../../util/constants.js";

export default async function (user: User) {
	const rows = await db.query.gearLists.findMany({
		where: (gearLists, { eq }) => eq(gearLists.discordUserId, user.id),
	});

	return new EmbedBuilder()
		.setColor(colors.staffGreen.hex)
		.setTitle(`${user.displayName}'s Gear Lists`)
		.setThumbnail(user.displayAvatarURL())
		.addFields(rows.map((row) => ({ name: row.name, value: row.url })));
}
