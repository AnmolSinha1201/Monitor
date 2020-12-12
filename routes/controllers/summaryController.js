import * as summaryService from "../../services/summaryService.js";

export const summaryGET = async({render, request, session}) => {
	const week = `${new Date().getFullYear()}-W${new Date().getLastWeekNumber()}`;
	const month = `${new Date().getFullYear()}-${new Date().getMonth() }` // 0 based index, so we get previous month

	const userid = await session.get('userid');
	const result1 = await summaryService.getWeeklySummary(userid, week.slice(-2));
	const result2 = await summaryService.getMonthlySummary(userid, Number(month.slice(-2))); // month starts with index 0

	console.log({ input : { week : week, month : month}, weeklyDataCount : result1.count, weeklyData : result1.data, monthlyDataCount : result2.count, monthlyData : result2.data });
	render('summary.ejs',{ input : { week : week, month : month}, weeklyDataFound : result1.found, weeklyData : result1.data, monthlyDataFound : result2.found, monthlyData : result2.data });
};

export const summaryPOST = async({render, request, session}) => {
	const body = request.body();
	const document = await body.value;
	const week = document.get('week');
	const month = document.get('month');
	console.log(week, month);

	const userid = await session.get('userid');
	const result1 = await summaryService.getWeeklySummary(userid, week.slice(-2));
	const result2 = await summaryService.getMonthlySummary(userid, Number(month.slice(-2)));

	render('summary.ejs', { input : { week : week, month : month}, weeklyDataFound : result1.found, weeklyData : result1.data, monthlyDataFound : result2.found, monthlyData : result2.data });
};

//https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
Date.prototype.getLastWeekNumber = function(){
	var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
	d.setDate(d.getDate() - 7);
	var dayNum = d.getUTCDay() || 7;
	d.setUTCDate(d.getUTCDate() + 4 - dayNum);
	var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
	return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};