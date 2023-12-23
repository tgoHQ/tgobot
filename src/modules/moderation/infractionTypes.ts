import { User } from "discord.js";

export default {
	badFaith: {
		pretty: "Bad-Faith User",
		execute: async (user: User) => {
			console.log(`banned ${user.username}`);
		},
	},
	nsfw: {
		prety: "NSFW Content",
		execute: async (user: User) => {},
	},
};
