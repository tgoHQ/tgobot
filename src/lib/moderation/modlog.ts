import { GuildTextBasedChannel, User } from "discord.js";
import { CHANNEL_INTRODUCTIONS } from "../discord/loadDiscordObjects";
import client from "../discord/client";
// Define an enum for ActionType
enum ActionType {
	Mute,
	Ban,
	Slowmode,
}

type ActionOptionsMap = {
	[ActionType.Mute]: MuteActionOpts;
	[ActionType.Ban]: BanActionOpts;
	[ActionType.Slowmode]: SlowmodeActionOpts;
};

interface BaseModerationAction {
	reason?: string;
	author: User;
}

// Define specific types for each ModerationAction with their required options
interface MuteActionOpts extends BaseModerationAction {
	duration: number; // in minutes
	targetUser: User;
}

interface BanActionOpts extends BaseModerationAction {
	deleteMessages: boolean;
	targetUser: User;
}

interface SlowmodeActionOpts extends BaseModerationAction {
	duration: number; // in seconds
	targetChannel: GuildTextBasedChannel;
}

// Define a union type of all possible ModerationActions
// type ModerationAction = MuteActionOpts | BanActionOpts | SlowmodeActionOpts;

// Factory function with a generic type parameter for ActionType
const createModerationAction = {
	[ActionType.Mute]: async (options: MuteActionOpts) => {
		console.log(options);
	},
	[ActionType.Ban]: async (options: BanActionOpts) => {
		console.log(options);
	},
	[ActionType.Slowmode]: async (options: SlowmodeActionOpts) => {
		console.log(options);
	},
} satisfies {
	[key in ActionType]: (options: ActionOptionsMap[key]) => Promise<void>;
};

// Example usage
await createModerationAction[ActionType.Slowmode]({
	duration: 60,
	targetChannel: CHANNEL_INTRODUCTIONS,
	author: client.user!,
});

await createModerationAction[ActionType.Mute]({
	duration: 60,
	author: client.user!,
	targetUser: client.user!,
});

await createModerationAction[ActionType.Ban]({
	deleteMessages: true,
	author: client.user!,
	targetUser: client.user!,
});
