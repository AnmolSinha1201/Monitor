import { executeQuery } from "../database/database.js";
import { bcrypt } from "../deps.js";

export const attemptLogin = async(email, password) => {
    const res = await executeQuery("SELECT * FROM users where email=$1", email);
    if (!res || res.rowCount == 0)
        return undefined;
    
    const credentials = res.rowsOfObjects()[0];
    const result = await bcrypt.compare(password, credentials.password); 
    
	return result ? credentials.id : undefined;
}

export const attemptRegister = async(email, password) => {
    const res = await executeQuery("SELECT * FROM users where email=$1", email);
    if (res && res.rowCount > 0)
        return undefined;
    
    const hash = await bcrypt.hash(password);
    await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2)", email, hash);

    return true;
}