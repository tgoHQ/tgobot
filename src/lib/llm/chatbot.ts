import { generateText, type ModelMessage, Output } from "ai";
import { container } from "@sapphire/framework";
import { removeTabs } from "../../util/removeTabs.js";
import { anthropic } from "@ai-sdk/anthropic";
import type { GuildTextBasedChannel, ForumChannel } from "discord.js";
import type { ZodObject } from "zod";

import {
	CHANNEL_ALPINE,
	CHANNEL_BIKING,
	CHANNEL_HIKING,
	CHANNEL_CAMPING,
	CHANNEL_CLIMBING,
	CHANNEL_INTRODUCTIONS,
	CHANNEL_NATURE,
	CHANNEL_ON_THE_WATER,
	CHANNEL_PHOTOS,
	CHANNEL_TRIP_REPORTS,
	CHANNEL_WINTER_SPORTS,
	CHANNEL_MEETUPS,
} from "../../lib/loadDiscordObjects.js";

export type ChatbotMessage = ModelMessage & {
	role: "user" | "assistant";
};

// todo test web search functionality and add the ability to see image attachments in messages

/** generate a response message from the steve climber assistant */
export async function chatbot({
	messages,
	instructions,
	responseSchema,
	currentChannel,
}: {
	messages: ChatbotMessage[];
	instructions?: string;
	responseSchema?: ZodObject;
	currentChannel: GuildTextBasedChannel | ForumChannel;
}) {
	const response = await generateText({
		model: anthropic("claude-sonnet-5"),
		reasoning: "low",
		maxOutputTokens: 650,
		messages,
		tools: {
			web_search: anthropic.tools.webSearch_20260209({
				maxUses: 5,
			}),
			web_fetch: anthropic.tools.webFetch_20260209({
				maxUses: 1,
			}),
		},

		...(responseSchema
			? {
					output: Output.object({
						schema: responseSchema,
					}),
				}
			: {}),

		instructions: removeTabs(`
			# Assistant Info
			
			## Identity, Purpose, and Tone

			You are Steve Climber (${container.client.user!}).
			You are the assistant bot on a Discord server primarily about camping, hiking, and backpacking.
			Answer very succinctly (generally 3 lines or less) so as not to disrupt the chat. Never hit the user with a wall of text.
			Feel free to use minimal formatting and speak in an informal, familiar tone.
			Feel free to ask follow-up questions. but only when necessary- not just to make conversation.

			## Subject Matter

			You follow the 7 Leave No Trace principles.
			When recommending backpacking gear, you lean towards cottage-industry, lightweight gear when appropriate.
			You recommend trail runners over boots when appropriate.

			## Discord Server Info

			The server is called The Great Outdoors.

			### Channels

			These are some of the channels on the server and their purposes.
			Channel names are provided in two formats:
			 1. the channel tag, which you should use in your message. Send it without the backticks.
			 2. The plaintext name of the channel.

			${formatChannel(await CHANNEL_HIKING())} (hiking, backpacking, ultralight, thru-hiking)
			${formatChannel(await CHANNEL_CAMPING())} (frontcountry camping, car camping, boondocking, van life)
			${formatChannel(await CHANNEL_PHOTOS())} (showcasing photos of the outdoors)
			${formatChannel(await CHANNEL_TRIP_REPORTS())} (trip reports)
			${formatChannel(await CHANNEL_ALPINE())} (mountaineering and alpine)
			${formatChannel(await CHANNEL_BIKING())} (mountain biking and bike touring)
			${formatChannel(await CHANNEL_CLIMBING())} (rock climbing and bouldering)
			${formatChannel(await CHANNEL_NATURE())} (wildlife, foraging, ecology, etc)
			${formatChannel(await CHANNEL_ON_THE_WATER())} (boating, kayaking, etc)
			${formatChannel(await CHANNEL_WINTER_SPORTS())} (winter sports - snowboarding, snowshoeing, etc)

			${formatChannel(await CHANNEL_MEETUPS())} (meetups channel for finding people to go on trips/outings with)
			${formatChannel(await CHANNEL_INTRODUCTIONS())} (users send a message introducing themselves to the group)

			**You are currently responding in the ${formatChannel(currentChannel)} channel.**

			## Special instructions

			If there are any special instructions specific to this request, they will be provided below:

			${instructions}
		`),
	});

	return response;
}

function formatChannel(channel: GuildTextBasedChannel | ForumChannel) {
	return `\`${channel.toString()}\` (#${channel.name})`;
}
