const db = require('../db');

const busAssignment = {
    save: (busAssignment) => {
        const {bus_id, user_id, route_id, assigned_place, assigned_date, 
              assigned_time, status} = busAssignment;
        const sql = `INSERT INTO bus_assignment(bus_id, user_id, route_id,
                    assigned_place, assigned_date, assigned_time, status)
                    VALUES(?,?,?,?,?,?,?)`;
        return db.execute(sql, [bus_id, user_id, route_id, assigned_place, 
                          assigned_date, assigned_time, status]);
        
    },

    findAll: () => {
        const sql = `SELECT * FROM bus_assignment WHERE bus_assignment.status=1
                    ORDER BY assigned_date DESC`;
        return db.execute(sql);
    }
};

module.exports = busAssignment;