const db = require('../db');

const crowdReport = {
    save: (crowdReport) => {
        const {bus_id, trip_id, current_count, crowd_status, status} 
            = crowdReport;
        const sql = `INSERT INTO crowd_report(bus_id, trip_id, current_count, 
                    crowd_status, status) VALUES(?,?,?,?,?)`;
        return db.execute(sql,[bus_id, trip_id, current_count, crowd_status, 
            status]);
    },

    findAll: () => {
        const sql = `SELECT * FROM crowd_report WHERE crowd_report.status=1
                    ORDER BY created_at DESC`;
        return db.execute(sql);
    },

    findById: (id) => {
        const sql = `SELECT * FROM crowd_report WHERE report_id=?
                    AND crowd_report.status=1`;
        return db.execute(sql,[id]);
    },

    findByText: (input) => {
        const searchText = `%${input}%`
        const sql = `SELECT * FROM crowd_report WHERE bus_id LIKE ? OR
                    trip_id LIKE ? OR current_count LIKE ? OR
                    crowd_status LIKE ? AND crowd_report.status=1`;
        return db.execute(sql,[searchText,searchText,searchText,searchText]);
    }
};

module.exports = crowdReport;