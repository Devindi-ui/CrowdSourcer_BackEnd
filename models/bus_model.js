const db = require('../db');

const bus = {
    save: (bus) => {
        const {bus_number, seat_capacity, route_id, bus_type_id, status, 
              status_d} = bus;
        const sql = `INSERT INTO bus (bus_number, seat_capacity, route_id, 
                    bus_type_id, status, status_d) VALUES (?,?,?,?,?,?)`;
        return db.execute (sql, [bus_number, seat_capacity, route_id, 
                          bus_type_id, status, status_d]);
    },

    findAll: () => {
        const sql = `SELECT * FROM bus WHERE bus.status_d=1
                    ORDER BY bus_id ASC`;
        return db.execute(sql);
    },

    findById: (id) => {
        const sql = `SELECT * FROM bus WHERE bus_id=? AND bus.status_d=1`;
        return db.execute(sql, [id]);
    },

    findByText: (input) => {
        const searchText = `%${input}%`
        const sql = `SELECT * FROM bus WHERE bus_number LIKE ? OR 
                    seat_capacity LIKE ? OR route_id LIKE ? OR bus_type_id
                    LIKE ? OR status LIKE ? AND status_d=1`;
        return db.execute(sql, [searchText, searchText, searchText, 
            searchText, searchText])
    }
}

module.exports = bus;