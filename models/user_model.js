const db = require('../db');

const user = {
    save: (user) => {
        const {name,email,password,phone,role_id,status} = user;
        const sql = "INSERT INTO user (name,email,password,phone,role_id,`status`) VALUES (?,?,?,?,?,?)";
        return db.execute(sql, [name,email,password,phone,role_id,status]);
    }
};

module.exports = user; 