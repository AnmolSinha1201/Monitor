import { executeQuery } from "../database/database.js";

export const getMonthlySummary = async(userid, month) => {
    const result = await getSummary(userid, month, MONTH_CASE);
    return result;
}

export const getWeeklySummary = async(userid, week) => {
    const result = await getSummary(userid, week, WEEK_CASE);
    return result;
}

const MONTH_CASE = 0;
const WEEK_CASE = 1;
export const getSummary = async(userid, count, CASE) => {
    const data = {
        avgSleepDuration : 0,
        avgSports : 0,
        avgStudy : 0,
        avgSleepQuality : 0,
        avgEatingQuality : 0,
        avgGenericMood : 0
    }

    const result1 = await getXMorning(userid, count, CASE);
    if (result1 != undefined)
    {
        data.avgSleepDuration = result1.avgsleepduration;
        data.avgSleepQuality = result1.avgsleepquality;
    }

    const result2 = await getXEvening(userid, count, CASE);
    if (result2 != undefined)
    {
        data.avgSports = result2.avgsports;
        data.avgStudy = result2.avgstudy;
        data.avgEatingQuality = result2.avgeatingquality;
    }

    const base = (result1 == undefined || result2 == undefined) ? 1 : 2;
    data.avgGenericMood = (Number(result1?.avggenericmood ?? 0) + Number(result2?.avggenericmood ?? 0)) / base;

    return { found : !(result1 == undefined && result2 == undefined), data : Rounder(data) };
}

export const Rounder = (data) => {
    const factor = 100;

    Object.keys(data).forEach((key) => {
        data[key] = Math.round(Number(data[key]) * factor ) / factor;
    })

    return data;
}

export const getXMorning = async(userid, count, CASE) => {
    const res = await executeQuery("select AVG(userid) as userid, AVG(sleepDuration) as avgSleepDuration, AVG(sleepQuality) as avgSleepQuality, AVG(genericmood) as avgGenericMood from morningReport WHERE userid=$1 AND date_part($3, date) = $2;"
        , userid, count, CASE == MONTH_CASE ? 'month' : 'week');
    
    if (res && res.rowCount > 0)
    {
        const result = res.rowsOfObjects()[0];
        if (result.userid != null) // Hack because we get rowCount = 1 even if nothing was found
            return result;
    }

	return undefined;
}

export const getXEvening = async(userid, count, CASE) => {
    const res = await executeQuery("select AVG(userid) as userid, AVG(timesportsexercise) as avgSports, AVG(timestudy) as avgStudy, AVG(qualityeating) as avgEatingQuality, AVG(genericmood) as avgGenericMood from eveningReport WHERE userid=$1 AND date_part($3, date) = $2;"
        , userid, count, CASE == MONTH_CASE ? 'month' : 'week');
    
	if (res && res.rowCount > 0)
    {
        const result = res.rowsOfObjects()[0];
        if (result.userid != null) // Hack because we get rowCount = 1 even if nothing was found
            return result;
    }

	return undefined;
}