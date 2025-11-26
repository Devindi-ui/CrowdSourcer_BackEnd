const db = require('../db');

const role = {
    save: (role) => {
        const {role_name, status} = role;
        const sql = "INSERT INTO role (role_name, status) VALUES(?,?)";
        return db.execute(sql, [role_name, status]);
    },

    findAll: () => {
        const sql = `SELECT * FROM role WHERE role.status=1 
                    ORDER BY role_name DESC`;
        return db.execute(sql);
    },

    findById: (id) => {
        const sql = `SELECT * FROM role WHERE role_id=?
                    AND role.status=1`;
        return db.execute(sql,[id]);
    },

    findByText: (input) => {
        const searchText = `%${input}`
        const sql = `SELECT * FROM role WHERE role_name LIKE ? AND status=1`;
        return db.execute(sql,[searchText]);
    },

    update: (role) => {
        const {id, role_name} = role;
        const sql = "UPDATE role SET role_name=? WHERE role_id=?";
        return db.execute(sql, [role_name, id]);
    },

    delete: (id) => {
        const sql = "UPDATE role SET role.status=0 WHERE role_id=?";
        return db.execute(sql, [id]);
    }
};

module.exports = role;