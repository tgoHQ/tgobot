import env from "../../util/env.js";
import { Events } from "discord.js";

export default {
	name: Events.MessageCreate,
	execute(client, message) {
		if (message.channel.id != env.CHANNEL_INTRODUCTIONS_ID) return;
		message.react("👋");
	},
};
