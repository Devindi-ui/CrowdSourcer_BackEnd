const db = require('../db');

const role = {
    save: (role) => {
        const {role_name, status} = role;
        const sql = "INSERT INTO role (role_name, status) VALUES(?,?)";
        return db.execute(sql, [role_name, status]);
    },

    findAll: () => {
        const sql = `SELECT * FROM role WHERE role.status=1 
                    ORDER BY role_name ASC`;
        return db.execute(sql);
    },

    findById: (id) => {
        const sql = `SELECT * FROM role WHERE role_id=?
                    AND role.status=1`;
        return db.execute(sql,[id]);
    }
};

module.exports = role;