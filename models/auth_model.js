const db = require('../db');

const auth = {
    save: (auth) =>{
        const {email, password} = auth;
        const sql = `INSERT INTO auth(email, password) VALUES(?,?)`;
        return db.execute(sql, [email, password]);
    }
}

module.exports = auth;