const {
	Client,
	Collection,
	GatewayIntentBits,
	REST,
	Routes,
	inlineCode,
	EmbedBuilder,
} = require("discord.js");
const humanizeDuration = require("humanize-duration");

/**
 * posts a modlog instance to the mod log channel as an embed
 * @param {ModLog} modLog
 * @param {*} modlogChannel mod log channel object
 * @returns message object
 */
async function postEmbed(modLog, modlogChannel) {
	//posts a log object to the modlog channel, returns the message object

	const embed = new EmbedBuilder()
		.setColor("137c5a")
		.setDescription(modLog.string)
		.setAuthor({
			name: modLog.author.username,
			iconURL: modLog.author.displayAvatarURL(),
		});

	return await modlogChannel.send({ embeds: [embed] });
}

module.exports = class ModLog {
	constructor(raw) {
		this.type = raw.type;
		this.author = raw.author;
		this.reason = raw.reason;
		this.targetUser = raw.targetUser;
		this.duration = raw.duration;
		this.slowmodeInterval = raw.slowmodeInterval;
		this.targetChannel = raw.targetChannel;
		this.bulkDeleteNumber = raw.bulkDeleteNumber;
	}
	get string() {
		let string;

		let humanDuration;
		if ("duration" in this) {
			humanDuration = humanizeDuration(this.duration);
		}

		switch (this.type) {
			case "Warn":
				string = `<:warn:1049224507598061628> Warned ${this.targetUser}`;
			case "Slowmode":
				string = `<:slowmode:1049227157156671508> Set slowmode to ${humanizeDuration(
					this.slowmodeInterval
				)} in ${this.targetChannel}`;
			case "Bulk Delete":
				string = `<:delete:1049226132622409749> Bulk deleted ${this.bulkDeleteNumber} messages in ${this.targetChannel}`;
			case "Mute":
				string = `<:timeout:1049257820882747432> Muted ${this.targetUser} for ${humanDuration}`;
			case "Unmute":
				string = `<:timeout:1049257820882747432> Unmuted ${this.targetUser}`;
			case "Ban":
				string = `<:ban:1049256901562609684> Banned ${this.targetUser}`;
			case "Unban":
				string = `<:ban:1049256901562609684> Unbanned ${this.targetUser}`;
		}

		string += ` with reason ${inlineCode(this.reason)}.`;

		return string;
	}
	async post(client) {
		//save log to db
		//then

		//post log to modlog channel
		// postEmbed(this, client.channels.fetch(process.env.MODLOG_CHANNEL_ID)); //TODO fix this

		//get message object returned from post and save to db

		//dm target user if applicable
		if ("targetUser" in this) {
			client.users.send(
				this.targetUser,
				this.string + `\nFor appeals: ${process.env.APPEALS_URL}`
			);
		}
	}
};

// {
//   type: string,
//   author: userObj,
//   reason: string,
//   targetUser: userObj,
//   duration: int(ms),
//   slowmodeInterval: int,
//   targetChannel: channelObj,
//   bulkDeleteNumber: int,
//   interaction: interaction
// };
