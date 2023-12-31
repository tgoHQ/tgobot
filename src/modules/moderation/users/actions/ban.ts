import { User } from "discord.js";
import userModerationLog from "../userModerationLog.js";

export default async function ban({
	user,
	reason,
	author,
}: {
	user: User;
	reason: string;
	author: User;
}) {
	const string = `<:ban:1049256901562609684> Banned ${user}`;
	await userModerationLog({ user, author, string, reason });

	//take action

	return string;
}
