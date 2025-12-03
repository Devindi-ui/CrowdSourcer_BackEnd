const db = require('../db');

const route = {
    save: (route) => {
        const {route_id, route_name, start_point, end_point, total_stops,
            distance, status, status_d} = route;
        const sql = `INSERT INTO route(route_id, route_name, start_point, 
                    end_point, total_stops, distance, status, status_d) 
                    VALUES(?,?,?,?,?,?,?,?)`;
        return db.execute (sql, [route_id, route_name, start_point, end_point, 
            total_stops, distance, status, status_d]);
    },

    findAll: () => {
        const sql = `SELECT * FROM route WHERE route.status_d=1
                    ORDER BY route_id ASC`;
        return db.execute(sql);
    },

    findById: (id) => {
        const sql = `SELECT * FROM route WHERE route_id=?
                    AND route.status_d=1`;
        return db.execute(sql,[id]);
    },

    findByText: (input) => {
        const searchText = `%${input}%`
        const sql = `SELECT * FROM route WHERE route_name LIKE ? OR
                    start_point LIKE ? OR end_point LIKE ? OR total_stops
                    LIKE ? OR distance LIKE ? OR status LIKE ? AND
                    route.status_d=1`;
        return db.execute(sql, [searchText, searchText, searchText, 
            searchText, searchText, searchText]);
    },

    update: (route) => {
        const {id, route_name, start_point, end_point, total_stops,
            distance, status} = route;
        const sql = `UPDATE route SET route_name=?, start_point=?, 
                    end_point=?, total_stops=?, distance=?, status=? 
                    WHERE route_id=?`;
        return db.execute(sql, [route_name, start_point, end_point, 
                         total_stops, distance, status, id]);
    },

    delete: (id) => {
        const sql = `UPDATE route SET route.status_d=0 WHERE route_id=?`;
        return db.execute(sql, [id]);
    }
}

module.exports = route;