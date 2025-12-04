const db = require('../db');

const alert = {
    save: (alert) => {
        const {created_by, alert_type, description, bus_id, 
              user_id, status_d} = alert;
        const sql = `INSERT INTO alert(created_by, alert_type, description, 
                    bus_id, user_id, status_d) VALUES(?,?,?,?,?,?)`;
        return db.execute(sql, [created_by, alert_type, description, 
                        bus_id, user_id, status_d]);
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
        const sql = `SELECT * FROM alert WHERE created_by LIKE ? OR
                    alert_type LIKE ? OR description LIKE ? OR
                    bus_id LIKE ? OR user_id LIKE ? OR status_d LIKE ? 
                    AND alert.status_d=1`;
        return db.execute(sql,[searchText,searchText,searchText,
                         searchText, searchText, searchText]);
    },

    update: (alert) => {
        const {id, created_by, alert_type, description, bus_id, 
              user_id} = alert;
        const sql = `UPDATE alert SET created_by=?, alert_type=?, 
                    description=?, bus_id=?, user_id=? WHERE alert_id=?`;
        return db.execute(sql, [created_by, alert_type, description, 
                         bus_id, user_id, id]);
    }
}

module.exports = alert;