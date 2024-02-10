import { User } from "discord.js";
import userModerationLog from "../userModerationLog.js";

export default async function kick({
	user,
	reason,
	author,
}: {
	user: User;
	reason: string;
	author: User;
}) {
	const string = `<:kick:1073030912230572143> Kicked ${user}`;
	await userModerationLog({ user, author, string, reason });

	//todo take action

	return string;
}
