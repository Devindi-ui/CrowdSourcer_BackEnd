const db = require('../db');

const reportHistory = {
    save: (reportHistory) => {
        const {bus_id, date, avg_crowd, peak_time, 
            total_reports, status} = reportHistory;
        const sql = `INSERT INTO report_history(bus_id, date, avg_crowd, 
                    peak_time, total_reports, status) VALUES(?,?,?,?,?,?)`;
        return db.execute(sql,[bus_id, date, avg_crowd, 
            peak_time, total_reports, status]);
    }
};

module.exports = reportHistory;