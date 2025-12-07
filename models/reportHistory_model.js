const db = require('../db');

const reportHistory = {
    save: (reportHistory) => {
        const {bus_id, date, avg_crowd, peak_time, 
            total_reports, status} = reportHistory;
        const sql = `INSERT INTO report_history(bus_id, date, avg_crowd, 
                    peak_time, total_reports, status) VALUES(?,?,?,?,?,?)`;
        return db.execute(sql,[bus_id, date, avg_crowd, 
            peak_time, total_reports, status]);
    },

    findAll: () =>{
        const sql = `SELECT * FROM report_history WHERE 
                    report_history.status=1`;
        return db.execute(sql);
    },

    findById: (id) => {
        const sql = `SELECT * FROM report_history WHERE history_id=? AND 
                    report_history.status=1`;
        return db.execute(sql,[id]);
    }
};

module.exports = reportHistory;