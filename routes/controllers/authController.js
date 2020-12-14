import * as authService from "../../services/authService.js";

export const loginGET = async({render, request}) => {
	render('login.ejs', { success : undefined, userid: undefined });
};

export const loginPOST = async({render, request, response, session}) => {
	const body = request.body();
	const document = await body.value;
    
    const email = document.get('email');
    const password = document.get('password');

	const userid = await authService.attemptLogin(email, password);
	
	if (userid)
	{
		await session.set('userid', userid);
		response.redirect('/');
	}
	else
		render('login.ejs', { success : false, userid: undefined });
};

export const registerGET = async({render, request}) => {
	render('register.ejs', { errors : undefined, input: undefined, userid: undefined });
};

export const registerPOST = async({render, request, response, session}) => {
	const body = request.body();
	const document = await body.value;
    
    const email = document.get('email');
    const password = document.get('password');

	const result = await authService.attemptRegister(email, password);
	console.log(result);

	if (result.passes)
		response.redirect('/auth/login');
	else
		render('register.ejs', { errors : result.errors, input : { email : email }, userid: undefined });
};

export const logout = async({session, response}) => {
	await session.set('userid', undefined);
	response.redirect('/');
}