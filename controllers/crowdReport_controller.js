const db = require('../db');
const crowdReport = require('../models/crowdReport_model');

const crowdReports = {
    createCrowdReport: async(req,res) => {
        try {
            const {bus_id, trip_id, current_count, crowd_status} = req.body;
            const [result] = await crowdReport.save({bus_id, trip_id, 
                current_count, crowd_status, status:1});
            res.status(201).json({msg: 'Crowd Report saved successfully!', 
                data: result})
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', 
                error: error.message});
        }
    },

    getAllCrowdReports: async(req,res) => {
        try {
            const [result] = await crowdReport.findAll();
            if(result.length === 0){
                return res.status(200).json({msg:"No data found"});
            }
            res.status(200).json({data:result});           
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', 
                error: error.message});
        }
    },

    getCrowdReportById: async(req,res) => {
        try {
            const [result] = await crowdReport.findById(req.params.id);
            if(result.length === 0){
                return res.status(200).json({msg: "Crowd Report not found"});
            }
            res.status(200).json({data:result});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
    },

    getCrowdReportByText: async(req,res) => {
        try {
            const result = await crowdReport.findByText(req.params.text);
            if(result.length === 0){
                return res.status(404).json({msg: "Crowd Report not found"});
            }
            res.status(200).json({data: result});
        } catch (error) {
            console.log(error);
            
            res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
    },

    updateCrowdReport: async(req,res) => {
        try {
            const {bus_id, trip_id, current_count, crowd_status} = req.body;
            const id = req.params.id;
            const [result] = await crowdReport.update({bus_id, trip_id, 
                current_count, crowd_status, id});
            if(result.affectedRows === 0){
                return res.status(404).json({msg:"Crowd Report not found"});
            }
            res.status(200).json({msg: "Crowd Report updated successfully!"});
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error', 
                error: error.message});
        }
    }
};

module.exports = crowdReports;