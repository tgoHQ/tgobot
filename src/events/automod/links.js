import { Events, Message, Client } from "discord.js";

export default {
	name: Events.MessageCreate,
	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 */
	async execute(client, message) {
		const linkRE = /https?:\/\/[^.]*\./;

		//if message does not contain a link, ignore
		if (!linkRE.test(message.content)) {
			console.log("message contains no links");
			return;
		}

		const member = await message.guild.members.fetch(message.author);

		//if member has verified role, ignore
		if (
			member.roles.cache.some((role) => {
				return role.id === process.env.INTRODUCED_ROLE_ID;
			})
		) {
			console.log("user is verified");
			return;
		}

		//if member joined more than 3 hours ago, ignore
		if (member.joinedTimestamp < Date.now - 3 * 60 * 60 * 1000) {
			console.log("user joined over 3 hours ago");
			return;
		}
	},
};

//on message send

//if message contains link AND user is not Introduced AND user joined less than 3 hours ago

//delete message
//notify author
//send message in alerts channel
