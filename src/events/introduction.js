import { Events } from "discord.js";

export default {
	name: Events.MessageCreate,
	execute(client, message) {
		if (message.channel.id != process.env.INTRODUCTION_CHANNEL_ID) return;
		message.react("👋");
	},
};
