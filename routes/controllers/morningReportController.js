import * as reportMorningService from "../../services/reportMorningService.js";

export const reportMorningGET = async({render}) => {
	render('reportMorning.ejs', { passes : undefined, errors : undefined, data : undefined, today : new Date().toJSON().slice(0,10) });
};

export const reportMorningPOST = async({render, request, session}) => {
	const body = request.body();
	const document = await body.value;
	const userid = await session.get('userid');
	
	const data = {
		date : document.get('date'),
		sleepDuration : Number(document.get('sleepDuration')),
		sleepQuality : Number(document.get('sleepQuality')),
		genericMood : Number(document.get('genericMood'))
	}
	

	const { passes, errors } = await reportMorningService.addReport(data, userid);
	render('reportMorning.ejs', { passes : passes, errors : errors, data : data, today : new Date().toJSON().slice(0,10) });
};