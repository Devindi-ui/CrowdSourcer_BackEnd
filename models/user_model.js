const db = require('../db');

const user = {
    save: (user) => {
        const {name, email, password, phone, role_id, status, status_d} = user;
        const sql = "INSERT INTO user (name, email, password, phone, role_id, status, status_d) VALUES (?,?,?,?,?,?,?)";
        return db.execute(sql, [name,email,password,phone,role_id,status, status_d]);
    },

    findAll: async() => {
        const sql = `SELECT * FROM user WHERE user.status_d=1
                    ORDER BY name DESC`;
        return db.execute(sql);
    }
}; 

module.exports = user; 