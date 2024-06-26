import { Events, Listener } from "@sapphire/framework";
import { Client } from "discord.js";

export class ReadyListener extends Listener {
	public constructor(
		context: Listener.LoaderContext,
		options: Listener.Options
	) {
		super(context, {
			...options,
			once: true,
			event: Events.ClientReady,
		});
	}

	public run(client: Client) {
		client.logger.info(`Logged in as ${client.user?.displayName}`)
	}
}
