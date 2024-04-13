import { EmbedBuilder, User } from "discord.js";
import db from "../db/drizzle.js";

export default async function (user: User) {
	const rows = await db.query.gearLists.findMany({
		where: (gearLists, { eq }) => eq(gearLists.discordUserId, user.id),
	});

	return new EmbedBuilder()
		.setColor("#137c5a")
		.setTitle(`${user.displayName}'s Gear Lists`)
		.setThumbnail(user.displayAvatarURL())
		.addFields(rows.map((row) => ({ name: row.name, value: row.url })));
}
