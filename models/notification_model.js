const db = require('../db');

const notification = {
    save: (notification) => {
        const {user_id, bus_id, message, status} = notification;
        const sql = `INSERT INTO notification(user_id, bus_id, message, 
                    status) VALUES(?,?,?,?)`;
        return db.execute(sql,[user_id, bus_id, message, status]);
    },

    findAll: () =
};

module.exports = notification;