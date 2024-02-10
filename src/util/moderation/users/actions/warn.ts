import { User } from "discord.js";
import userModerationLog from "../userModerationLog.js";

export default async function warn({
	user,
	reason,
	author,
}: {
	user: User;
	reason: string;
	author: User;
}) {
	const string = `<:warn:1049224507598061628> Warned ${user}`;
	await userModerationLog({ user, author, string, reason });

	//take action

	return string;
}
