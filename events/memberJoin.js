const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
	name: Events.GuildMemberAdd,
	execute(client, member) {
		const permanentLogChannel = member.guild.channels.cache.get(
			process.env.PERMANENT_LOG_CHANNEL_ID
		);

		const embed = new EmbedBuilder()
			.setColor("137c5a")
			.setTitle("User Joined")
			.setDescription(member.user.toString())
			.addFields({ name: "Username", value: member.user.tag });

		permanentLogChannel.send({ embeds: [embed] });

		console.log(member.user.displayAvatarURL);
	},
};
