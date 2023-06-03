async function callDB(url, method, body) {
	try {
		const opts = {
			headers: {
				"xc-token": process.env.NOCODB_TOKEN,
			},
			method: method,
		};
		if (body) opts.body = body;

		const response = await fetch(`${process.env.NOCODB_URL}${url}`, opts);

		if (!response.ok) {
			console.error("db call returned bad status code");
			console.log(await response.json());
			return {};
		}

		return await response.json();
	} catch (e) {
		console.error("db call error");
		console.error(e);
	}
}

module.exports = {
	topBeans: async function topBeans() {
		const data = await callDB("/beans?sort=-quantity", "GET", {});
		console.log(data);
	},
};
