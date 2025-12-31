import { AutoRoleConfigRule } from "./logic.js";
import {
	ROLE_MODERATOR_BASE,
	ROLE_MODERATOR_COSMETIC,
	ROLE_EXPERT,
	ROLE_PERKS,
	ROLE_BOOSTER_BASE,
	ROLE_BOOSTER_COSMETIC,
	ROLE_PATRON_BASE,
	ROLE_PATRON_COSMETIC,
	ROLE_MINECRAFT,
} from "../loadDiscordObjects.js";

export async function getAutoRoleConfig(): Promise<AutoRoleConfigRule[]> {
	return [
		{
			role: await ROLE_PERKS(),
			mode: "sync",
			roleRequirements: {
				roles: [
					await ROLE_MODERATOR_BASE(),
					await ROLE_EXPERT(),
					await ROLE_BOOSTER_BASE(),
					await ROLE_PATRON_BASE(),
				],
				type: "any",
			},
		},
		{
			role: await ROLE_MINECRAFT(),
			mode: "remove",
			roleRequirements: {
				roles: [await ROLE_PERKS()],
				type: "all",
			},
		},
		{
			role: await ROLE_BOOSTER_COSMETIC(),
			mode: "remove",
			roleRequirements: {
				roles: [await ROLE_BOOSTER_BASE()],
				type: "all",
			},
		},
		{
			role: await ROLE_PATRON_COSMETIC(),
			mode: "remove",
			roleRequirements: {
				roles: [await ROLE_PATRON_BASE()],
				type: "all",
			},
		},
		{
			role: await ROLE_MODERATOR_COSMETIC(),
			mode: "sync",
			roleRequirements: {
				roles: [await ROLE_MODERATOR_BASE()],
				type: "all",
			},
		},
	];
}
