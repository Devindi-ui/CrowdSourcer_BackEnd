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
    }
};

module.exports = crowdReport;