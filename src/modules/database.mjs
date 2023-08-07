/**
 *
 * @param {string} query
 * @param {string} variables
 * @returns
 */
export default async function graphql(query, variables = {}) {
	try {
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

		if (result.errors) throw result.errors;

		return result.data;
	} catch (error) {
		console.error(error);
		return undefined;
	}
}
