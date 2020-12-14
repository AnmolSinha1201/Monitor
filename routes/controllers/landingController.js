import * as summaryService from "../../services/summaryService.js";

export const landing = async({render, session}) => {
	const today = new Date();
	const dateToday = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

	const yesterday = new Date();
	yesterday.setDate(today.getDate() - 1);
	const dateYesterday = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`;
	
	let moodToday = 0;
	const summaryToday = await summaryService.getSummaryForAllForSpecificDay(dateToday);
	if (Object.keys(summaryToday).length > 0)
		moodToday = summaryToday.avgGenericMood;

	let moodYesterday = 0;
	const summaryYesterday = await summaryService.getSummaryForAllForSpecificDay(dateYesterday);
	if (Object.keys(summaryYesterday).length > 0)
		moodYesterday = summaryYesterday.avgGenericMood;

	const userid = await session.get('userid');
	render('landing.ejs', { userid : userid, moodToday : moodToday, moodYesterday : moodYesterday });
};