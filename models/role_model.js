const db = require('../db');

const role = {
    save: (role) => {
        const {role_name} = role;
        const sql = "INSERT INTO role (role_name) VALUES(?)";
        return db.execute(sql, [role_name]);
    }
};

module.exports = role;