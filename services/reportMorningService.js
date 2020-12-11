import { executeQuery } from "../database/database.js";
import { required, minNumber, numberBetween, isNumber, isNumeric, isDate, validate } from "../deps.js"

export const addReport = async(data, userid) => {
	const rules = {
		date : [required, isDate],
		sleepDuration : [required, isNumber, minNumber(0)],
		sleepQuality : [required, isNumber, numberBetween(1, 5)],
		genericMood : [required, isNumber, numberBetween(1, 5)]
	}

	const [passes, errors] = await validate(data, rules);
	if (!passes)
		return { passes : passes, errors : errors };
		
	const res = await executeQuery("SELECT * FROM morningReport WHERE userid=$1 AND date=$2", userid, data.date);
	if (res && res.rowCount > 0)
	{
		await executeQuery("DELETE FROM morningReport WHERE userid=$1 AND date=$2", userid, data.date);
	}

	await executeQuery("INSERT INTO morningReport (userid, date, sleepDuration, sleepQuality, genericMood) VALUES ($1, $2, $3, $4, $5)"
		, userid, data.date, data.sleepDuration, data.sleepQuality, data.genericMood);

	return { passes : passes, errors : errors };
}