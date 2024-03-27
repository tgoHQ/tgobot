import client from "../../lib/client.js";
import env from "../../lib/env.js";

export default async function postModLogChannel(embed) {
	const channel = client.channels.cache.get(env.CHANNEL_MODLOG_ID);

	return channel.send({ embeds: [embed] });
}
//todo this whole file
