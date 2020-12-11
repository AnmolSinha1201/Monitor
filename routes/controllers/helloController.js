import * as helloService from "../../services/helloService.js";
import * as reportMorningService from "../../services/reportMorningService.js";

const hello = async({render}) => {
	render('index.ejs', { newsList: await helloService.getHello() });
};

const helloSpecific = async({render, params}) => {
	render('specific.ejs', await helloService.getHelloSpecific(params.id));
};

export const landing = async({render}) => {
	render('landing.ejs');
};

export const reportMorningGET = async({render}) => {
	render('reportMorning.ejs', { errors : undefined, data : undefined });
};

export const reportMorningPOST = async({render, request}) => {
	const body = request.body();
	const document = await body.value;
	
	const data = {
		date : document.get('date'),
		sleepDuration : Number(document.get('sleepDuration')),
		sleepQuality : Number(document.get('sleepQuality')),
		genericMood : Number(document.get('genericMood'))
	}


	const errors = await reportMorningService.addReport(data);
	render('reportMorning.ejs', { errors : errors, data : data });
};

export const reportEveningGET = async({render}) => {
	render('reportEvening.ejs', { errors : undefined, data : undefined });
};
 
export { hello, helloSpecific };