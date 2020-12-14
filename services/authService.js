import { executeQuery } from "../database/database.js";
import { bcrypt } from "../deps.js";
import { validate, required, isEmail, minLength } from "../deps.js"

export const attemptLogin = async(email, password) => {
    const res = await executeQuery("SELECT * FROM users where email=$1", email);
    if (!res || res.rowCount == 0)
        return undefined;
    
    const credentials = res.rowsOfObjects()[0];
    const result = await bcrypt.compare(password, credentials.password); 
    
	return result ? credentials.id : undefined;
}

export const attemptRegister = async(email, password) => {
    const rules = {
		email : [required, isEmail],
		password : [required, minLength(4)],
    }
    const input = {
        email : email,
        password : password
    }
	const [passes, errors] = await validate(input, rules);
	if (!passes)
        return { passes : passes, errors : errors };
        
    const res = await executeQuery("SELECT * FROM users where email=$1", email);
    console.log(res.rowCount);
    if (res && res.rowCount > 0)
        return { passes : false, errors : { email : { "Unique" : "Email ids must be unique" } } };
    
    const hash = await bcrypt.hash(password);
    await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2)", email, hash);

    return { passes : true, errors : {} };
}