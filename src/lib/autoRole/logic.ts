// automatically apply and remove roles based on other required roles

import { Role, GuildMember } from "discord.js";
import { getAutoRoleConfig } from "./config.js";

export type AutoRoleConfigRule = {
	/** the role to be automated */
	role: Role;
	/** the behavior mode.
	 * - "add" will add the role when the requirements become met.
	 * - "remove" will remove the role if the requirements become unmet.
	 * - "sync" will both add and remove the role, keeping the role's membership in sync with the requirements.
	 */
	mode: "add" | "remove" | "sync";
	roleRequirements: {
		/** array of required roles */
		roles: Role[];
		/** requirement type. require either any role from the array, or all roles from the array */
		type: "any" | "all";
	};
};

export async function executeMemberAutoRoles(member: GuildMember) {
	const autoRoleConfig = await getAutoRoleConfig();

	console.log("executing auto roles for", member.user.displayName);
	console.log(
		"has roles:",
		member.roles.cache.map((role) => role.name),
	);

	for (const rule of autoRoleConfig) {
		await executeAutoRoleRuleOnMember({ member, rule });
	}
}

async function executeAutoRoleRuleOnMember({
	member,
	rule,
}: {
	member: GuildMember;
	rule: AutoRoleConfigRule;
}) {
	const meetsRequirements = CheckIfMemberMeetsRuleRequirements(member, rule);
	const hasRole = member.roles.cache.has(rule.role.id);

	console.log(rule.role.name);
	console.log("has role:", hasRole);
	console.log("meets requirements:", meetsRequirements);

	switch (rule.mode) {
		case "add":
			// add if they don't have the role but meet the requirements
			if (!hasRole && meetsRequirements) {
				await member.roles.add(rule.role);
				console.log(
					"GAVE ROLE",
					rule.role.name,
					"to",
					member.user.displayName,
					"using 'add' rule",
				);
				return;
			}
			break;
		case "remove":
			// remove if they have the role but don't meet the requirements
			if (hasRole && !meetsRequirements) {
				await member.roles.remove(rule.role);
				console.log(
					"TOOK ROLE",
					rule.role.name,
					"from",
					member.user.displayName,
					"using 'remove' rule",
				);
				return;
			}
			break;
		case "sync":
			// do the actions from both add and remove

			// add if they don't have the role but meet the requirements
			if (!hasRole && meetsRequirements) {
				await member.roles.add(rule.role);
				console.log(
					"GAVE ROLE",
					rule.role.name,
					"to",
					member.user.displayName,
					"using 'sync' rule",
				);
				return;
			}

			// remove if they have the role but don't meet the requirements
			if (hasRole && !meetsRequirements) {
				await member.roles.remove(rule.role);
				console.log(
					"TOOK ROLE",
					rule.role.name,
					"from",
					member.user.displayName,
					"using 'sync' rule",
				);
				return;
			}

			break;
		default:
			throw new Error("Unhandled mode");
	}

	console.log();
}

function CheckIfMemberMeetsRuleRequirements(
	member: GuildMember,
	rule: AutoRoleConfigRule,
) {
	const memberRoles = member.roles.cache;

	if (rule.roleRequirements.type === "any") {
		return rule.roleRequirements.roles.some((role) => memberRoles.has(role.id));
	}

	if (rule.roleRequirements.type === "all") {
		return rule.roleRequirements.roles.every((role) =>
			memberRoles.has(role.id),
		);
	}

	throw new Error("Unhandled role requirement type");
}
