// import * as helloService from "../../services/helloService.js";

const getHello = async({response}) => {
	// response.body = await helloService.getHello();
};

const getHelloSpecific = async({request, response, params}) => {
	// response.body =await helloService.getHelloSpecific(params.id);
};

const setHello = async({request, response}) => {
	const body = request.body({type: 'json'});
	const document = await body.value;
	// helloService.setHello(document.title, document.content);
	response.status = 200;
};

const deleteHello = async({request, response, params}) => {
	// await helloService.deleteHello(params.id);
	response.status = 200;
};

export { getHello, getHelloSpecific, setHello, deleteHello };