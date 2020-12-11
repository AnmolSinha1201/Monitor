import { executeQuery } from "../database/database.js";

const getHello = async() => {
	const res = await executeQuery("SELECT * FROM news");
	if (res && res.rowCount > 0) {
		return res.rowsOfObjects();
	}

	return [];
}

const getHelloSpecific = async(id) => {
	const res = await executeQuery("SELECT * FROM news where id = $1", id);
	if (res && res.rowCount > 0) {
		return res.rowsOfObjects()[0];
	}

	return [];
}

const setHello = async(title, content) => {
	await executeQuery("INSERT INTO news (title, content) VALUES ($1, $2);", title, content);
}

const deleteHello = async(id) => {
	await executeQuery("delete from news where id = $1;", id);
}


export { getHello, setHello, getHelloSpecific, deleteHello };