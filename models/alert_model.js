const db = require('../db');

const alert = {
    save: (alert) => {
        const {created_by, alert_type, description, bus_id, 
              user_id, status_d} = alert;
        const sql = `INSERT INTO alert(created_by, alert_type, description, 
                    bus_id, user_id, status_d) VALUES(?,?,?,?,?,?)`;
        return db.execute(sql, [created_by, alert_type, description, 
                        bus_id, user_id, status_d]);
    }
}

module.exports = alert;