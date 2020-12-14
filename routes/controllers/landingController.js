export const landing = async({render, session}) => {
	const userid = await session.get('userid');
	render('landing.ejs', { userid : userid });
};