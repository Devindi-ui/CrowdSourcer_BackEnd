const db = require('../db');

const bus = {
    save: (bus) => {
        const {bus_number, seat_capacity, route_id, bus_type_id, status, status_d} = bus;
        const sql = "INSERT INTO bus (bus_number, seat_capacity, route_id, bus_type_id, status, status_d) VALUES (?,?,?,?,?,?)";
        return db.execute (sql, [bus_number, seat_capacity, route_id, bus_type_id, status, status_d]);
    }
}

module.exports = bus;