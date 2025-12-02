const db = require('../db');
const { findById } = require('./role_model');

const routeStop = {
    save: (routeStop) => {
        const {stop_name, status} = routeStop;
        const sql = `INSERT INTO route_stop(stop_name, 
                    status) VALUES(?,?)`;
        return db.execute(sql, [stop_name, status]);
    },

    findAll: () => {
        const sql = `SELECT * FROM route_stop WHERE route_stop.status=1
                    ORDER BY stop_order_id ASC`;
        return db.execute(sql);
    },

    findById: (id) => {
        const sql = `SELECT * FROM route_stop WHERE stop_order_id=?
                    AND route_stop.status=1`;
        return db.execute(sql, [id]);
    },

    findByText: (input) => {
        const searchText = `%${input}%`
        const sql = `SELECT * FROM route_stop WHERE stop_name LIKE ? AND
                    route_stop.status=1`;
        return db.execute(sql, [searchText]);
    }
}

module.exports = routeStop;