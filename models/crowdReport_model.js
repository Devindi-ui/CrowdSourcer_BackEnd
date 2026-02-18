const db = require('../db');

const crowdReport = {

    save: (crowdReport) => {
        const {bus_id, trip_id, current_count, crowd_status, status} = crowdReport;

        const sql = `
            INSERT INTO crowd_report(
                bus_id,
                trip_id,
                current_count,
                crowd_status,
                status
            ) VALUES(?,?,?,?,?)
        `;

        return db.execute(sql,[
            bus_id,
            trip_id,
            current_count,
            crowd_status,
            status
        ]);
    },

    findAll: () => {
        const sql = `
            SELECT 
                cr.report_id,
                cr.bus_id,
                b.bus_number,
                cr.trip_id,
                r.route_name,
                cr.current_count,
                cr.crowd_status,
                cr.status,
                cr.created_at 
            FROM crowd_report cr 
            JOIN bus b ON cr.bus_id = b.bus_id
            JOIN trip t ON cr.trip_id = t.trip_id
            JOIN route r ON t.route_id = r.route_id 
            WHERE cr.status = 1
            ORDER BY cr.created_at DESC
        `;
        return db.execute(sql);
    },

    findById: (id) => {
        const sql = `
            SELECT 
                cr.report_id,
                cr.bus_id,
                b.bus_number,
                cr.trip_id,
                r.route_name,
                cr.current_count,
                cr.crowd_status,
                cr.status
            FROM crowd_report cr 
            JOIN bus b ON cr.bus_id = b.bus_id 
            JOIN trip t ON cr.trip_id = t.trip_id
            JOIN route r ON t.route_id = r.route_id 
            WHERE cr.report_id = ?
            AND cr.status = 1
        `;
        return db.execute(sql,[id]);
    },

    findByText: (input) => {
        const searchText = `%${input}%`;

        const sql = `
            SELECT 
                report_id,
                bus_id,
                trip_id,
                current_count,
                crowd_status,
                status,
                created_at
            FROM crowd_report
            WHERE (
                bus_id LIKE ? OR
                trip_id LIKE ? OR 
                current_count LIKE ? OR
                crowd_status LIKE ?
            )
            AND status = 1
            ORDER BY created_at DESC
        `;

        return db.execute(sql,[
            searchText,
            searchText,
            searchText,
            searchText
        ]);
    },

    update: (crowdReport) => {
        const {bus_id, trip_id, current_count, crowd_status, id} = crowdReport;

        const sql = `
            UPDATE crowd_report 
            SET bus_id = ?, 
                trip_id = ?, 
                current_count = ?, 
                crowd_status = ? 
            WHERE report_id = ?
        `;

        return db.execute(sql,[
            bus_id,
            trip_id,
            current_count,
            crowd_status,
            id
        ]);
    },

    delete: (id) => {
        const sql = `
            UPDATE crowd_report 
            SET status = 0
            WHERE report_id = ?
        `;
        return db.execute(sql,[id]);
    }

};

module.exports = crowdReport;
