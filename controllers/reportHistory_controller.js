const db = require('../db');
const reportHistory = require('../models/reportHistory_model');

const reportHistories = {
    createReportHistory: async(req,res) => {
        try {
            const {report_id, bus_id, date, avg_crowd, peak_time, 
                total_reports} = req.body;
            const [result] = await reportHistory.save({report_id, 
                bus_id, date, avg_crowd, peak_time, total_reports, 
                status:1});
            res.status(201).json({msg: 'Report History saved successfully!', 
                data: req.body});
        } catch (error) {
            console.log(error);
            
            res.status(500).json({message: 'Internal Server Error', 
                error: error.message});
        }
    }
};

module.exports = reportHistories;