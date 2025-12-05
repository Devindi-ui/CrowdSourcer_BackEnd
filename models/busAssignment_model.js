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
    },

    findById: (id) => {
        const sql = `SELECT * FROM bus_assignment WHERE assignment_id=?
                    AND bus_assignment.status=1`;
        return db.execute(sql, [id]);
    },

    findByText: (input) => {
        const searchText = `%${input}%`
        const sql = `SELECT * FROM bus_assignment WHERE bus_id LIKE ? OR
                    user_id LIKE ? OR route_id LIKE ? OR assigned_place
                    LIKE ? OR assigned_date LIKE ? OR assigned_time LIKE
                    ? AND bus_assignment.status=1`;
        return db.execute(sql,[searchText,searchText,searchText,searchText,
                          searchText,searchText]);
    }
};

module.exports = busAssignment;