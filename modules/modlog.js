const { inlineCode, EmbedBuilder, Message } = require("discord.js");
const humanizeDuration = require("humanize-duration");

module.exports = class ModLog {
	constructor({
		type,
		author,
		reason,
		targetUser,
		duration,
		slowmodeInterval,
		targetChannel,
		bulkDeleteNumber,
	}) {
		this.type = type;
		this.author = author;
		this.reason = reason;
		this.targetUser = targetUser;
		this.duration = duration;
		this.slowmodeInterval = slowmodeInterval;
		this.targetChannel = targetChannel;
		this.bulkDeleteNumber = bulkDeleteNumber;
	}
	get string() {
		let string;

		switch (this.type) {
			case "Warn":
				string = `<:warn:1049224507598061628> Warned ${this.targetUser}`;
				break;
			case "Slowmode":
				string = `<:slowmode:1049227157156671508> Set slowmode to ${humanizeDuration(
					this.slowmodeInterval
				)} in ${this.targetChannel}`;
				break;
			case "Bulk Delete":
				string = `<:delete:1049226132622409749> Bulk deleted ${
					this.bulkDeleteNumber === 1
						? this.bulkDeleteNumber + " message"
						: this.bulkDeleteNumber + " messages"
				} in ${this.targetChannel}`;
				break;
			case "Mute":
				string = `<:timeout:1049257820882747432> Muted ${this.targetUser}${
					this.duration ? ` for ${humanizeDuration(this.duration)}` : ""
				}`;
				break;
			case "Unmute":
				string = `<:timeout:1049257820882747432> Unmuted ${this.targetUser}`;
				break;
			case "Ban":
				string = `<:ban:1049256901562609684> Banned ${this.targetUser}`;
				break;
			case "Unban":
				string = `<:ban:1049256901562609684> Unbanned ${this.targetUser}`;
				break;
			case "Kick":
				string = `<:kick:1073030912230572143> Kicked ${this.targetUser}`;
		}

		string += ` with reason ${inlineCode(this.reason)}.`;

		return string;
	}
	async post({ guild, client }) {
		//save log to db
		//then

		//post log to modlog channel
		postEmbed(this, guild.channels.cache.get(process.env.MODLOG_CHANNEL_ID));

		//get message object returned from post and save to db

		//dm target user if applicable
		// if ("targetUser" in this) {
		// 	try {
		// 		client.users.send(
		// 			this.targetUser,
		// 			this.string + `\nFor appeals: ${process.env.APPEALS_URL}`
		// 		);
		// 	} catch (err) {
		// 		console.log(err);
		// 	}
		// }
	}
};

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

	const message = await modlogChannel.send({ embeds: [embed] });
	message.crosspost();
	return message;
}
