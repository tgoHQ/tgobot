import type { User } from "discord.js";
import { removeTabs } from "../../../../util/removeTabs.js";

export async function modActionDmUser({
	targetUser,
	string,
	author,
	reason,
}: {
	targetUser: User;
	string: string;
	author: User;
	reason?: string;
}) {
	try {
		await targetUser.send({
			content: removeTabs(`
				You have recieved a moderation action on The Great Outdoors.
				### Action
				${string}
				### Reason
				${reason ?? "No reason provided."}
				### Author
				${author}

				You can review our [moderation policies](https://docs.google.com/document/d/1q-EzLayHiIS-cDfmuWoJwnuKGfVc7d2sjX7_LEIuTMA/) or [submit an appeal](https://forms.gle/4jWKXXXjWPhp9GbW6).
			`),
		});
	} catch {}
}
