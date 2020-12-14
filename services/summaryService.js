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

    const result = await getSummaryForPeriod(userid, count, CASE);
    if (result != undefined)
    {
        data.avgSleepDuration = result.avgsleepduration;
        data.avgSleepQuality = result.avgsleepquality;
        data.avgSports = result.avgsports;
        data.avgStudy = result.avgstudy;
        data.avgEatingQuality = result.avgeatingquality;
        data.avgGenericMood = result.avggenericmood;
    }

    return { found : !(result == undefined), data : Rounder(data) };
}

export const Rounder = (data) => {
    const factor = 100;

    Object.keys(data).forEach((key) => {
        data[key] = Math.round(Number(data[key]) * factor ) / factor;
    })

    return data;
}

export const getSummaryForPeriod = async(userid, count, CASE) => {
    const res = await executeQuery("select AVG(mr.userid) as userid, AVG((mr.genericmood + er.genericmood) / 2.0) as avgGenericMood, avg(sleepduration) as avgSleepDuration, avg(sleepquality) as avgSleepQuality, avg(timesportsexercise) as avgSports, avg(timestudy) as avgStudy, avg(qualityeating) as avgEatingQuality from MorningReport mr full outer join EveningReport er on mr.userid = er.userid and mr.date = er.date where mr.userid = $1 and date_part($3, mr.date) = $2;"
        , userid, count, CASE == MONTH_CASE ? 'month' : 'week');
    
	if (res && res.rowCount > 0)
    {
        const result = res.rowsOfObjects()[0];
        if (result.userid != null) // Hack because we get rowCount = 1 even if nothing was found
            return result;
    }

	return undefined;
}