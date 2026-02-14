const db = require('../db');

const alert = {
    save: (alert) => {
        const {alert_type, description, bus_number, 
              user_id, avg_passengers, status_d} = alert;
        const sql = `INSERT INTO alert(alert_type, description, 
                    bus_number, user_id, avg_passengers, status_d) 
                    VALUES(?,?,?,?,?,?)`;
        return db.execute(sql, [alert_type, description, bus_number, 
            user_id, avg_passengers, status_d]);
    },

    findAll: () => {
        const sql = `SELECT * FROM alert WHERE alert.status_d=1
                    ORDER BY alert_id DESC`;
        return db.execute(sql);
    },

    findById: (id) => {
        const sql = `SELECT * FROM alert WHERE alert_id=? AND 
                    alert.status_d=1`;
        return db.execute(sql,[id]);
    },

    findByText: (input) => {
        const searchText = `%${input}%`
        const sql = `SELECT * FROM alert 
                    WHERE (
                            alert_type LIKE ? OR 
                            description LIKE ? OR bus_number LIKE ? OR user_id LIKE ? OR 
                            avg_passengers LIKE ?
                          ) 
                    AND alert.status_d=1`;
        return db.execute(sql,[searchText, searchText, searchText,
                         searchText, searchText]);
    },

    update: (alert) => {
        const {id, alert_type, description, bus_number, 
              user_id, avg_passengers} = alert;
        const sql = `UPDATE alert SET alert_type = ?, 
                    description = ?, bus_number = ?, user_id = ?, avg_passengers = ?
                    WHERE alert_id = ?`;
        return db.execute(sql, [alert_type, description, 
                         bus_number, user_id, avg_passengers, id]);
    },

    delete: (id) => {
        const sql = `UPDATE alert SET alert.status_d = 0 WHERE alert_id = ?`;
        return db.execute(sql, [id]);
    },

    countAll: () => {
        const sql = `SELECT COUNT(*) AS total FROM alert WHERE status_d = 1
                    AND DATE(created_at) = CURDATE()`;
        return db.execute(sql);
    }
};

module.exports = alert;