import config from "../../config";
import { inlineCode, EmbedBuilder, NewsChannel, Client } from "discord.js";
import humanizeDuration from "humanize-duration";

const types = {
	Warn: {
		emoji: "<:warn:1049224507598061628>",
		verb: "Warned",
	},
	Slowmode: {
		emoji: "<:slowmode:1049227157156671508>",
		verb: "Set slowmode",
	},
	"Bulk Delete": {
		emoji: "<:delete:1049226132622409749>",
		verb: "Bulk deleted",
	},
	Mute: {
		emoji: "<:timeout:1049257820882747432>",
		verb: "Muted",
	},
	Unmute: {
		emoji: "<:timeout:1049257820882747432>",
		verb: "Unmuted",
	},
	Ban: {
		emoji: "<:ban:1049256901562609684>",
		verb: "Banned",
	},
	Unban: {
		emoji: "<:ban:1049256901562609684>",
		verb: "Unbanned",
	},
	Kick: {
		emoji: "<:kick:1073030912230572143>",
		verb: "Kicked",
	},
};

export default class ModLog {
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
		const { emoji, verb } = types[this.type];

		let beginning = emoji + " " + verb + " ";
		let middle;

		switch (this.type) {
			case "Warn":
				middle = this.targetUser.toString();
				break;

			case "Slowmode":
				middle = `to ${humanizeDuration(this.slowmodeInterval)} in ${
					this.targetChannel
				}`;
				break;

			case "Bulk Delete":
				middle = `${this.bulkDeleteNumber} message${
					this.bulkDeleteNumber === 1 ? "" : "s"
				} in ${this.targetChannel}`;
				break;

			case "Mute":
				middle = `${this.targetUser} ${
					this.duration ? `for ${humanizeDuration(this.duration)}` : ""
				}`;
				break;

			case "Unmute":
				middle = this.targetUser.toString();
				break;

			case "Ban":
				middle = this.targetUser.toString();
				break;

			case "Unban":
				middle = this.targetUser.toString();
				break;

			case "Kick":
				middle = this.targetUser.toString();
				break;

			default:
				middle = "error";
		}

		const end = this.reason ? ` with reason ${inlineCode(this.reason)}.` : ".";

		return beginning + middle.toString() + end;
	}

	/**
	 *
	 * @param {Client} client
	 */
	async init(client) {
		//post log to modlog channel
		const modLogMessage = await postEmbed(this, client);

		//dm target user if applicable
		// if ("targetUser" in this) {
		// 	try {
		// 		client.users.send(
		// 			this.targetUser,
		// 			this.string + `\nFor appeals: ${config.APPEALS_URL}`
		// 		);
		// 	} catch (err) {
		// 		console.log(err);
		// 	}
		// }
	}
}

/**
 * posts a modlog to the mod log channel as an embed
 */
async function postEmbed(modLog, client) {
	//posts a log object to a channel, returns the message

	const channel = client.channels.cache.get(config.CHANNEL_MODLOG_ID);

	if (!(channel instanceof NewsChannel)) {
		console.log(
			"ModLog channel could not be found. Check the value of your MODLOG_CHANNEL_ID env variable."
		);
		return;
	}

	const embed = new EmbedBuilder()
		.setColor("#137c5a")
		.setDescription(modLog.string)
		.setAuthor({
			name: modLog.author.username,
			iconURL: modLog.author.displayAvatarURL(),
		});
	const message = await channel.send({ embeds: [embed] });

	//publish in announcement channel
	await message.crosspost();

	return message;
}

//
