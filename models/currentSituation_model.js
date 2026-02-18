const db = require("../db");

const currentSituation = {

    save: (data) => {
        return db.query(
            `INSERT INTO current_situation 
            (bus_id, user_id, route_id, current_stop, avg_passengers, status) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                data.bus_id,
                data.user_id,
                data.route_id,
                data.current_stop,
                data.avg_passengers,
                data.status
            ]
        );
    },

    findAll: () => {
        return db.query(
            `SELECT cs.cr_id,
                    cs.current_stop,
                    cs.avg_passengers,
                    u.user_id,
                    u.name AS user_name,
                    r.route_id,
                    r.route_name,
                    b.bus_id,
                    b.bus_number
             FROM current_situation cs
             JOIN users u ON cs.user_id = u.user_id
             JOIN routes r ON cs.route_id = r.route_id
             JOIN buses b ON cs.bus_id = b.bus_id
             WHERE cs.status = 1
             ORDER BY cs.cr_id DESC`
        );
    },

    findById: (id) => {
        return db.query(
            `SELECT cs.cr_id,
                    cs.current_stop,
                    cs.avg_passengers,
                    u.user_id,
                    u.name AS user_name,
                    r.route_id,
                    r.route_name,
                    b.bus_id,
                    b.bus_number
             FROM current_situation cs
             JOIN users u ON cs.user_id = u.user_id
             JOIN routes r ON cs.route_id = r.route_id
             JOIN buses b ON cs.bus_id = b.bus_id
             WHERE cs.cr_id = ? AND cs.status = 1`,
            [id]
        );
    },

    findByText: (text) => {
        return db.query(
            `SELECT cs.cr_id,
                    cs.current_stop,
                    cs.avg_passengers,
                    u.user_id,
                    u.name AS user_name,
                    r.route_id,
                    r.route_name,
                    b.bus_id,
                    b.bus_number
             FROM current_situation cs
             JOIN users u ON cs.user_id = u.user_id
             JOIN routes r ON cs.route_id = r.route_id
             JOIN buses b ON cs.bus_id = b.bus_id
             WHERE cs.status = 1
             AND (
                u.user_id LIKE ?
                OR u.name LIKE ?
                OR r.route_name LIKE ?
                OR b.bus_number LIKE ?
                OR cs.current_stop LIKE ?
                OR cs.avg_passengers LIKE ?
             )`,
            [`%${text}%`,`%${text}%`,`%${text}%`,`%${text}%`,`%${text}%`,`%${text}%`]
        );
    },

    update: (data) => {
        return db.query(
            `UPDATE current_situation 
             SET bus_id = ?, 
                 user_id = ?, 
                 route_id = ?, 
                 current_stop = ?, 
                 avg_passengers = ?
             WHERE cr_id = ? AND status = 1`,
            [
                data.bus_id,
                data.user_id,
                data.route_id,
                data.current_stop,
                data.avg_passengers,
                data.cr_id
            ]
        );
    },

    delete: (id) => {
        return db.query(
            `UPDATE current_situation 
             SET status = 0 
             WHERE cr_id = ?`,
            [id]
        );
    }
};

module.exports = currentSituation;
