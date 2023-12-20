import config from "../../config";
import { Events } from "discord.js";

export default {
	name: Events.MessageCreate,
	execute(client, message) {
		if (message.channel.id != config.INTRODUCTION_CHANNEL_ID) return;
		message.react("👋");
	},
};
