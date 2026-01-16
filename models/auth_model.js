const db = require('../db');

const auth = {
    save: (auth) =>{
        const {email, password, status_d} = auth;
        const sql = `INSERT INTO auth(email, password, status_d) VALUES(?,?,?)`;
        return db.execute(sql, [email, password, status_d]);
    },

    countAll: () => {
        const sql = `SELECT COUNT(*) AS total FROM auth WHERE status_d=1`;
        return db.execute(sql);
    }
}

module.exports = auth;