import config from "../../config.js";
import { Events } from "discord.js";

export default {
	name: Events.MessageCreate,
	execute(client, message) {
		if (message.channel.id != config.CHANNEL_INTRODUCTIONS_ID) return;
		message.react("👋");
	},
};
