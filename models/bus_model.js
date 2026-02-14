const db = require('../db');
const { countAll } = require('./user_model');

const bus = {
    save: (bus) => {
        const {bus_number, seat_capacity, route_id, status, 
              status_d} = bus;
        const sql = `INSERT INTO bus (bus_number, seat_capacity, route_id, 
                    status, status_d) VALUES (?,?,?,?,?)`;
        return db.execute (sql, [bus_number, seat_capacity, route_id, 
                           status, status_d]);
    },

    findAll: () => {
        const sql = `
                SELECT b.*, r.route_name 
                FROM bus b
                JOIN route r ON b.route_id = r.route_id
                WHERE b.status_d = 1
                ORDER BY b.bus_id ASC
        `;
        return db.execute(sql);
    },

    findById: (id) => {

        const sql = `
            SELECT 
                b.bus_id,
                b.bus_number,
                b.seat_capacity,
                b.route_id,
                b.status,
                r.route_name
            FROM bus b
            LEFT JOIN route r 
                ON b.route_id = r.route_id
            WHERE b.bus_id = ? 
            AND b.status_d = 1
        `;

        return db.execute(sql, [id]);
    },


    findByText: (input) => {
        const searchText = `%${input}%`
        const sql = `
            SELECT b.*, r.route_name 
            FROM bus b 
            JOIN route r ON b.route_id = r.route_id 
            WHERE (
                bus_number LIKE ? 
                OR b.seat_capacity LIKE ? 
                OR r.route_name LIKE ? 
                OR b.status LIKE ? 
            ) 
            AND b.status_d=1
        `;
        return db.execute(sql, [searchText, searchText, searchText, 
                          searchText])
    },

    update: (bus) => {
        const {id, bus_number, seat_capacity, route_id, status} = bus;
        const sql = `
            UPDATE bus 
            SET bus_number=?, 
                seat_capacity=?, 
                route_id=?,
                status=? 
            WHERE bus_id=? AND status_d = 1
        `;
        return db.execute(sql, [bus_number, seat_capacity, route_id,
                          status, id
        ]);
    },

    delete: (id) => {
        const sql = `UPDATE bus SET status_d = 0 WHERE bus_id = ?`;
        return db.execute(sql, [id]);
    },

    countAll: () => {
        const sql = `
            SELECT COUNT(*) AS total 
            FROM bus 
            WHERE status_d = 1 AND status = "active"
        `;
        return db.execute(sql);
    }
};

module.exports = bus;