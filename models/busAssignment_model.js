const db = require('../db');

const busAssignment = {
    save: (busAssignment) => {
        const {bus_id, user_id, route_id, assigned_place, assigned_date, 
              assigned_time, status} = busAssignment;
        const sql = `
            INSERT INTO bus_assignment
            (bus_id, user_id, route_id, assigned_place, assigned_date, 
            assigned_time, status)
            VALUES(?,?,?,?,?,?,?)
        `;
        return db.execute(sql, [bus_id, user_id, route_id, assigned_place, 
                          assigned_date, assigned_time, status]);
        
    },

    findAll: () => {
        const sql = `
            SELECT 
                ba.assignment_id,
                ba.bus_id,
                b.bus_number,
                ba.user_id,
                ba.route_id,
                r.route_name,
                ba.assigned_place,
                ba.assigned_date,
                ba.assigned_time,
                ba.status
            FROM bus_assignment ba 
            LEFT JOIN bus b ON ba.bus_id = b.bus_id
            LEFT JOIN route r ON ba.route_id = r.route_id
            WHERE ba.status = 1
            ORDER BY ba.assigned_date DESC
        `;
        return db.execute(sql);
    },

    findById: (id) => {
        const sql = `
            SELECT 
                ba.assignment_id,
                ba.bus_id,
                b.bus_number,
                ba.user_id,
                ba.route_id,
                r.route_name,
                ba.assigned_place,
                ba.assigned_date,
                ba.assigned_time,
                ba.status
            FROM bus_assignment ba 
            LEFT JOIN bus b ON ba.bus_id = b.bus_id
            LEFT JOIN route r ON ba.route_id = r.route_id
            WHERE ba.assignment_id = ?
            AND ba.status = 1`;
        return db.execute(sql, [id]);
    },

    findByText: (input) => {
        const searchText = `%${input}%`
        const sql = `
            SELECT
                ba.assignment_id,
                ba.bus_id,
                b.bus_number,
                ba.user_id,
                ba.route_id,
                r.route_name,
                ba.assigned_place,
                ba.assigned_date,
                ba.assigned_time,
                ba.status
            FROM bus_assignment ba 
            LEFT JOIN bus b ON ba.bus_id = b.bus_id
            LEFT JOIN route r ON ba.route_id = r.route_id
            WHERE (
                ba.bus_id LIKE ? OR
                ba.user_id LIKE ? OR 
                ba.route_id LIKE ? OR 
                ba.assigned_place LIKE ? OR 
                ba.assigned_date LIKE ? OR 
                ba.assigned_time LIKE ?
            )
            AND ba.status = 1
        `;
        return db.execute(sql,[searchText,searchText,searchText,searchText,
                          searchText,searchText]);
    },

    update: (busAssignment) => {
        const {id, bus_id, user_id, route_id, assigned_place, assigned_date, 
              assigned_time} = busAssignment;
        const sql = `
            UPDATE bus_assignment 
            SET 
                bus_id=?, 
                user_id=?, 
                route_id=?, 
                assigned_place=?, 
                assigned_date=?,
                assigned_time=? 
            WHERE assignment_id=?
        `;
        return db.execute(sql,[bus_id, user_id, route_id, assigned_place, 
                         assigned_date, assigned_time, id]);
    },

    delete: (id) => {
        const sql = `
            UPDATE bus_assignment 
            SET status = 0 
            WHERE assignment_id=?
        `;
        return db.execute(sql,[id]);
    }
};

module.exports = busAssignment;