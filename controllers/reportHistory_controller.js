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
    },

    getAllReportHistories: async(req,res) => {
        try {
            const [result] = await reportHistory.findAll();
            if(result.length === 0){
                return res.status(200).json({msg:"No data found"});
            }
            res.status(200).json({data:result});           
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', 
                error: error.message});
        }
    },

    getReportHistoryById: async(req,res) => {
        try {
            const [result] = await reportHistory.findById(req.params.id);
            if(result.length === 0){
                return res.status(200).json({msg: "Report History not found"});
            }
            res.status(200).json({data:result});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', 
                error: error.message});
        }
    },

    getReportHistoryByText: async(req,res) => {
        try {
            const [result] = await reportHistory.findByText(req.params.text);
            if(result.length === 0){
                return res.status(404).json({msg: "Report History not found"});
            }
            res.status(200).json({data: result});
        } catch (error) {
            console.log(error);
            
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
    },

    updateReportHistory: async(req,res) => {
        try {
            const {bus_id, date, avg_crowd, peak_time, total_reports} =
                req.body;
            const id = req.params.id;
            const [result] = await reportHistory.update({bus_id, date, 
                avg_crowd, peak_time, total_reports, id});
            if(result.affectedRows === 0){
                return res.status(404).json({msg:"Student not found"});
            }
            res.status(200).json({msg: "Student updated successfully!"});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', 
                error: error.message});
        }
    },

    deleteReportHistory: async(req,res) => {
        try {
            const [result] = await reportHistory.delete(req.params.id);
            if(result.affectedRows === 0){
                return res.status(404).json({msg: "Report History not found"});
            }
            res.status(200).json({msg: "Report History deleted successfully"});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', 
                error: error.message});
        }
    }
};

module.exports = reportHistories;