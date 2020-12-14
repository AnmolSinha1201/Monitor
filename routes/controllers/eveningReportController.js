import * as reportEveningService from "../../services/reportEveningService.js";

export const reportEveningGET = async({render, session}) => {
	const userid = await session.get('userid');
	render('reportEvening.ejs', { passes : undefined, errors : undefined, data : undefined, today : new Date().toJSON().slice(0,10), userid: userid });
};

export const reportEveningPOST = async({render, request, session}) => {
	const body = request.body();
	const document = await body.value;
	const userid = await session.get('userid');
	
	const data = {
		date : document.get('date'),
		timeSportsExercise : Number(document.get('timeSportsExercise')),
		timeStudy : Number(document.get('timeStudy')),
		qualityEating : Number(document.get('qualityEating')),
		genericMood : Number(document.get('genericMood'))
	}

	const { passes, errors } = await reportEveningService.addReport(data, userid);
	render('reportEvening.ejs', { passes : passes, errors : errors, data : data, today : new Date().toJSON().slice(0,10), userid : userid });
};