import * as helloService from "../../services/helloService.js";

const hello = async({render}) => {
	render('index.ejs', { newsList: await helloService.getHello() });
};

const helloSpecific = async({render, params}) => {
	render('specific.ejs', await helloService.getHelloSpecific(params.id));
};

export const landing = async({render}) => {
	render('landing.ejs');
};

export const reportMorning = async({render}) => {
	render('reportMorning.ejs');
};

export const reportEvening = async({render}) => {
	render('reportEvening.ejs');
};
 
export { hello, helloSpecific };