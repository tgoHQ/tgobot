const { Events } = require("discord.js");

module.exports = {
	name: Events.GuildMemberAdd,
	execute(client, member) {
		const permanentLogChannel = member.guild.channels.cache.get(
			process.env.PERMANENT_LOG_CHANNEL_ID
		);

		console.log(permanentLogChannel.name);
	},
};
