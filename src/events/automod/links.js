import { Events, Message, Client, EmbedBuilder } from "discord.js";

export default {
	name: Events.MessageCreate,
	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 */
	async execute(client, message) {
		const linkRE = /https?:\/\/.{2,}/;

		//if message does not contain a link, ignore
		if (!linkRE.test(message.content)) {
			console.log("message contains no links");
			return;
		}

		const member = await message.guild.members.fetch(message.author);

		//if member is a bot, ignore
		if (member.user.bot) return;

		//if member has Introduced role, ignore
		if (
			member.roles.cache.some((role) => {
				return role.id === process.env.INTRODUCED_ROLE_ID;
			})
		) {
			console.log("user is introduced");
			return;
		}

		//if member joined more than 3 hours ago, ignore
		if (member.joinedTimestamp < Date.now() - 2 * 60 * 60 * 1000) {
			console.log("user joined over 2 hours ago");
			return;
		}

		message.channel.send(
			`${member.user} You may not send links until you've been a member for 2 hours or introduced yourself in <#${process.env.INTRODUCTION_CHANNEL_ID}>`
		);

		message.delete();

		const alertChannel = await client.channels.fetch(
			process.env.ALERT_CHANNEL_ID
		);

		const embed = new EmbedBuilder()
			.setTitle("Automoderator blocked a link from a new user")
			.setColor("137c5a")
			.addFields(
				{ name: "User", value: member.user.toString() },
				{ name: "Message Content", value: message.content }
			);

		alertChannel.send({ embeds: [embed] });
	},
};

//on message send

//if message contains link AND user is not Introduced AND user joined less than 3 hours ago

//delete message
//notify author
//send message in alerts channel
