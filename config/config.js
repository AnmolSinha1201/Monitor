let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
	config.database = {};
} else {
	config.database = {
		hostname: "lallah.db.elephantsql.com",
		database: "cighozcx",
		user: "cighozcx",
		password: "2XTI5-6_FUJHs0RmA3hwf_6NhEUQV3xc",
		port: 5432
	};
}

export { config }; 