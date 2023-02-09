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
			.setThumbnail(member.user.displayAvatarURL())
			.setDescription(member.user.toString())
			.addFields({ name: "Username", value: member.user.tag });

		permanentLogChannel.send({ embeds: [embed] });
		console.log(timeSince(member.user.createdAt));
	},
};

function timeSince(date) {
	const seconds = Math.floor((new Date() - date) / 1000);

	let interval = Math.floor(seconds / 31536000);

	if (interval > 1) {
		return interval + " years";
	}
	interval = Math.floor(seconds / 2592000);
	if (interval > 1) {
		return interval + " months";
	}
	interval = Math.floor(seconds / 86400);
	if (interval > 1) {
		return interval + " days";
	}
	interval = Math.floor(seconds / 3600);
	if (interval > 1) {
		return interval + " hours";
	}
	interval = Math.floor(seconds / 60);
	if (interval > 1) {
		return interval + " minutes";
	}
	return Math.floor(seconds) + " seconds";
}
