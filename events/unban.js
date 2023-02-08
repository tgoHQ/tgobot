const { Events } = require("discord.js");
const ModLog = require("../modules/modlog");

module.exports = {
	name: Events.GuildBanRemove,
	execute(client, { user }) {
		const modlog = new ModLog({
			type: "Unban",
			author: client.user,
			reason: "",
			targetUser: user,
		});

		console.log(process.env.GUILD_ID);

		modlog.post({
			guild: client.guilds.cache.get(process.env.GUILD_ID),
			client,
		});
	},
};
