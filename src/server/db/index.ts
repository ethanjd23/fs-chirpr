import * as mysql from "mysql";
import chirpsDB from "./chirpsdb" 

export const connection = mysql.createConnection({
    host: "localhost",
    user: "chirprapp",
    password: "chirpr",
    database: "chirpr"
});

export const query = (query: string, values?: Array<string | number>) => {
    return new Promise <Array<any>>((resolve, reject) => {
        connection.query(query, values, (err, result) => {
            if(err) throw err;
            return resolve(result);
        })
    })
};

export default {
    chirpsDB
}