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

    findAll: () => {
        const sql = `SELECT * FROM trip WHERE trip.status_d=1
                    ORDER BY trip_id`;
        return db.execute(sql);
    },

    findById: (id) => {
        const sql = `SELECT * FROM trip WHERE trip_id=? AND
                    trip.status_d=1`;
        return db.execute(sql,[id]);
    }
};

module.exports = trip;