import * as helloService from "../../services/helloService.js";

const hello = async({render}) => {
	render('index.ejs', { newsList: await helloService.getHello() });
};

const helloSpecific = async({render, params}) => {
	render('specific.ejs', await helloService.getHelloSpecific(params.id));
};
 
export { hello, helloSpecific };