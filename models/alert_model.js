const db = require('../db');

const alert = {

    save: (alert) => {
        const {alert_type, description, bus_number, user_id, avg_passengers, status_d} = alert;
        const sql = `INSERT INTO alert 
                    (alert_type, description, bus_number, user_id, avg_passengers, status_d) 
                    VALUES (?,?,?,?,?,?)`;
        return db.execute(sql, [
            alert_type, description, bus_number,
            user_id, avg_passengers, status_d
        ]);
    },

    findAll: () => {
        const sql = `
            SELECT a.*, u.name AS user_name
            FROM alert a
            LEFT JOIN user u ON a.user_id = u.user_id
            WHERE a.status_d = 1
            ORDER BY a.alert_id DESC
        `;
        return db.execute(sql);
    },

    findById: (id) => {
        const sql = `
            SELECT a.*, u.name AS user_name
            FROM alert a
            LEFT JOIN user u ON a.user_id = u.user_id
            WHERE a.alert_id = ? AND a.status_d = 1
        `;
        return db.execute(sql, [id]);
    },

    findByText: (input) => {
        const searchText = `%${input}%`;
        const sql = `
            SELECT a.*, u.name AS user_name
            FROM alert a
            LEFT JOIN user u ON a.user_id = u.user_id
            WHERE (
                a.alert_type LIKE ? OR
                a.description LIKE ? OR
                a.bus_number LIKE ? OR
                a.user_id LIKE ? OR
                u.name LIKE ? OR
                a.avg_passengers LIKE ?
            )
            AND a.status_d = 1
        `;
        return db.execute(sql, [
            searchText, searchText, searchText,
            searchText, searchText, searchText
        ]);
    },

    update: (alert) => {
        const {id, alert_type, description, bus_number, user_id, avg_passengers} = alert;
        const sql = `
            UPDATE alert SET
                alert_type = ?,
                description = ?,
                bus_number = ?,
                user_id = ?,
                avg_passengers = ?
            WHERE alert_id = ?
        `;
        return db.execute(sql, [
            alert_type, description, bus_number,
            user_id, avg_passengers, id
        ]);
    },

    delete: (id) => {
        const sql = `UPDATE alert SET status_d = 0 WHERE alert_id = ?`;
        return db.execute(sql, [id]);
    }

};

module.exports = alert;
