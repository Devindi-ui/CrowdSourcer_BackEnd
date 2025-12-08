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
    },

    findByText: (input) => {
        const searchText = `%${input}%`;
        const sql = `SELECT * FROM report_history WHERE bus_id LIKE ? OR
                    date LIKE ? OR avg_crowd LIKE ? OR peak_time LIKE ? OR
                    total_reports LIKE ? AND report_history.status=1`;
        return db.execute(sql,[searchText,searchText,searchText,searchText,
            searchText]);
    },

    update: (reportHistory) => {
        const {id, date, avg_crowd, peak_time, total_reports} = 
            reportHistory;
        const sql = `UPDATE report_history SET date=?, avg_crowd=?, 
                    peak_time=?, total_reports=? WHERE history_id=?`;
        return db.execute(sql,[bus_id, date, avg_crowd, peak_time, 
            total_reports, id]);
    }
};

module.exports = reportHistory;