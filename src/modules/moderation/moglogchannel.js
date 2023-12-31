import client from "../../util/client.js";
import env from "../../util/env.js";

export default async function postModLogChannel(embed) {
	const channel = client.channels.cache.get(env.CHANNEL_MODLOG_ID);

	return channel.send({ embeds: [embed] });
}
