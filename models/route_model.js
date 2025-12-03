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
    }
}

module.exports = route;