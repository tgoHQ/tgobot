/**
 *
 * @param {string} query
 * @param {string} variables
 * @returns
 */
export default async function graphql(query, variables = {}) {
	try {
		if (!(process.env.HASURA_BASE_URL && process.env.HASURA_SECRET)) {
			throw new Error(
				"HASURA_BASE_URL and HASURA_SECRET env variables are required!"
			);
		}

		const response = await fetch(process.env.HASURA_BASE_URL, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"x-hasura-admin-secret": process.env.HASURA_SECRET,
			},
			body: JSON.stringify({
				query,
				variables,
			}),
		});
		const result = await response.json();

		if (!result.data) throw result;

		return result.data;
	} catch (error) {
		console.error(error);
		return undefined;
	}
}
