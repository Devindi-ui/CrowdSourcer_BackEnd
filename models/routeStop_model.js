const db = require('../db');

const routeStop = {
    save: (routeStop) => {
        const {stop_name, status} = routeStop;
        const sql = `INSERT INTO route_stop(stop_name, 
                    status) VALUES(?,?)`;
        return db.execute(sql, [stop_name, status]);
    },

    findAll: () => {
        const sql = `SELECT * FROM route_stop WHERE route_stop.status=1
                    ORDER BY `
    }
}

module.exports = routeStop;