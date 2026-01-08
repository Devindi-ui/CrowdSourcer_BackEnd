const db = require('../db');
const { findById } = require('./role_model');

const user = {
    save: (user) => {
        const {name, email, password, phone, role_id, status_d} = user;
        const sql = "INSERT INTO user (name, email, password, phone, role_id, status_d) VALUES (?,?,?,?,?,?)";
        return db.execute(sql, [name,email,password,phone,role_id, status_d]);
    },

    findAll: async() => {
        const sql = `SELECT * FROM user WHERE user.status_d=1
                    ORDER BY name DESC`;
        return db.execute(sql);
    },

    findById: async(id) => {
        const sql = `SELECT * FROM user WHERE user_id=?
                    AND user.status_d=1`;
        return db.execute(sql,[id]);
    },

    findByText: async(input) => {
        const searchText = `%${input}%`
        const sql = `SELECT * FROM user WHERE name LIKE ? OR email LIKE ? 
                    OR password LIKE ? OR phone LIKE ? OR role_id LIKE ? 
                    AND user.status_d=1`;
        return db.execute(sql, [searchText, searchText, searchText, 
                          searchText, searchText]);
    },

    update: (user) => {
        const {id, name, email, password, phone, role_id} = user;
        const sql = "UPDATE user SET name=?, email=?, password=?, phone=?, role_id=? WHERE user_id=?";
        return db.execute(sql, [name, email, password, phone, role_id, id]);
    },

    delete: (id) => {
        const sql = "UPDATE user SET user.status_d=0 WHERE user_id=?";
        return db.execute(sql, [id]);
    }
}; 

module.exports = user; 