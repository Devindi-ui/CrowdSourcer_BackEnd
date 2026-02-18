const db = require('../db');

const trip = {
    save: (trip) => {
        const {bus_id, route_id, start_time, end_time, date, status, 
            status_d} = trip;
        const sql = `INSERT INTO trip (bus_id, route_id, start_time, 
                    end_time, date, status, status_d) VALUES(?,?,?,?,?,?,?)`;
        return db.execute(sql,[bus_id, route_id, start_time, end_time, date, 
                         status, status_d]);
    },

    findAllWithRoute: () => {
        const sql = `
            SELECT 
                t.trip_id,
                t.bus_id,
                t.route_id,
                r.route_name,
                t.start_time,
                t.end_time,
                t.date,
                t.status,
                t.status_d 
            FROM trip t 
            JOIN route r ON t.route_id = r.route_id 
            ORDER BY t.trip_id DESC
        `;
        return db.execute(sql);
    },

    findById: (id) => {
        const sql = `SELECT * FROM trip WHERE trip_id=? AND
                    trip.status_d=1`;
        return db.execute(sql,[id]);
    },

    findByText: (input) => {
        const searchText = `%${input}%`
        const sql = `SELECT * FROM trip WHERE bus_id LIKE ? OR
                    route_id LIKE ? OR start_time LIKE ? OR
                    end_time LIKE ? OR date LIKE ? OR status LIKE ? 
                    AND trip.status_d=1`;
        return db.execute(sql,[searchText,searchText,searchText,searchText,
                         searchText,searchText]);
    },

    update: (trip) => {
        const {id, bus_id, route_id, start_time, end_time, date, status} = trip;
        const sql = `UPDATE trip SET bus_id=?, route_id=?, start_time=?, 
                    end_time=?, date=?, status=? WHERE trip_id=?`;
        return db.execute(sql,[bus_id, route_id, start_time, end_time, 
                         date, status, id]);
    },

    delete: (id) => {
        const sql = `UPDATE trip SET trip.status_d=0 WHERE trip_id=?`;
        return db.execute(sql,[id]);
    },

    countAll: () => {
        const sql = `SELECT COUNT(*) AS total FROM trip WHERE 
            status = "ongoing" AND status_d = 1`;
        return db.execute(sql);
    }
};

module.exports = trip;