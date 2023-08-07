import {
	inlineCode,
	EmbedBuilder,
	Client,
	GuildChannel,
	TextChannel,
	Message,
} from "discord.js";
import humanizeDuration from "humanize-duration";
import graphql from "./database.mjs";

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
		this.typeData = types[type];
		this.author = author;
		this.reason = reason;
		this.targetUser = targetUser;
		this.duration = duration;
		this.slowmodeInterval = slowmodeInterval;
		this.targetChannel = targetChannel;
		this.bulkDeleteNumber = bulkDeleteNumber;
	}

	get string() {
		const { emoji, verb } = this.typeData;

		let beginning = emoji + " " + verb + " ";
		let middle;

		switch (this.type) {
			case "Warn":
				middle = this.targetUser;
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
				middle = this.targetUser;
				break;

			case "Ban":
				middle = this.targetUser;
				break;

			case "Unban":
				middle = this.targetUser;
				break;

			case "Kick":
				middle = this.targetUser;
		}

		const end = this.reason ? ` with reason ${inlineCode(this.reason)}.` : ".";

		return beginning + middle.toString() + end;
	}

	/**
	 *
	 * @param {Client} client
	 */
	async post(client) {
		//post log to modlog channel
		const modLogMessage = await postEmbed(this, client);

		//save log to db
		const query = `
		mutation MyMutation($author: String, $reason: String, $modlog_message: String, $target_channel: String, $target_user: String, $duration: Int, $slowmode_interval: Int, $bulk_delete_number: Int, $type: String) {
			insert_modlog_one(object: {author: $author, reason: $reason, modlog_message: $modlog_message, target_channel: $target_channel, target_user: $target_user, duration: $duration, slowmode_interval: $slowmode_interval, bulk_delete_number: $bulk_delete_number, type: $type}) {
			  id
			}
		  }
		  
		`;
		const variables = {
			author: this.author.id,
			reason: this.reason,
			modlog_message: modLogMessage.id,
			target_user: this.targetUser?.id,
			target_channel: this.targetChannel?.id,
			duration: this.duration,
			slowmode_interval: this.slowmodeInterval,
			bulk_delete_number: this.bulkDeleteNumber,
			type: this.type,
		};
		console.log(await graphql(query, variables));

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
}

/**
 * posts a modlog to the mod log channel as an embed
 * @param {ModLog} modLog
 * @param {Client} client
 * @returns {Promise<Message>}
 */
async function postEmbed(modLog, client) {
	//posts a log object to a channel, returns the message

	/**
	 * @type {TextChannel}
	 */
	const channel = client.channels.cache.get(process.env.MODLOG_CHANNEL_ID);

	const embed = new EmbedBuilder()
		.setColor("137c5a")
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
