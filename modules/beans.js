module.exports = {
	callDB: async function callDB(url, method, body) {
		try {
			const response = await fetch(process.env.NOCODB_URL + url, {
				headers: {
					"xc-token": process.env.NOCODB_TOKEN,
				},
				method: method,
				body: body,
			});

			if (!response.ok) {
				console.error("db call returned bad status code");
				return {};
			}

			return await response.json();
		} catch (e) {
			console.error("db call error");
			console.error(e);
		}
	},
	topBeans: async function callDB(url, method, body) {
		try {
			const response = await fetch(process.env.NOCODB_URL + url, {
				headers: {
					"xc-token": process.env.NOCODB_TOKEN,
				},
				method: method,
				body: body,
			});

			if (!response.ok) {
				console.error("db call returned bad status code");
				return {};
			}

			return await response.json();
		} catch (e) {
			console.error("db call error");
			console.error(e);
		}
	},
};
