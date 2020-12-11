import * as authService from "../../services/authService.js";

export const loginGET = async({render, request}) => {
	render('login.ejs', { success : undefined });
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
		render('login.ejs', { success : false });
};

export const registerGET = async({render, request}) => {
	render('register.ejs', { success : undefined });
};

export const registerPOST = async({render, request, response, session}) => {
	const body = request.body();
	const document = await body.value;
    
    const email = document.get('email');
    const password = document.get('password');

	const success = authService.attemptRegister(email, password);

	if (success)
		response.redirect('/auth/login');
	else
		render('register.ejs', { success : false });
};

