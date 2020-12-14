import { Client, Pool } from "../deps.js";
import { config } from "../config/config.js";

const connectionPool = new Pool(config.database, 3);
// const getClient = () => {
// 	return new Client(config.database);
// }

const executeQuery = async(query, ...args) => {
	const client = await connectionPool.connect();
	try {
		return await client.query(query, ...args);
	} catch (e) {
		console.log(e);
	} finally {
		await client.release();
	}
}

export { executeQuery };