const db = require('../db');

const notification = {
    save: (notification) => {
        const {user_id, bus_id, message, status} = notification;
        const sql = `INSERT INTO notification(user_id, bus_id, message, 
                    status) VALUES(?,?,?,?)`;
        return db.execute(sql,[user_id, bus_id, message, status]);
    },

    findAll: () => {
        const sql = `SELECT * FROM notification WHERE notification.status=1
                    ORDER BY updated_at DESC`;
        return db.execute(sql);
    },

    findById: (id) => {
        const sql = `SELECT * FROM notification WHERE notification_id=?
                    AND notification.status=1`;
        return db.execute(sql,[id]);
    },

    findByText: (input) => {
        const searchText = `%${input}%`;
        const sql = `SELECT * FROM notification WHERE user_id LIKE ? OR 
                    bus_id LIKE ? OR message LIKE ? AND 
                    notification.status=1`;
        return db.execute(sql,[searchText,searchText,searchText]);
    }
};

module.exports = notification;