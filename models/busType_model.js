const db = require('../db');

const busType = {
    save: (busType) => {
        const {type_name, description, status} = busType;
        const sql = "INSERT INTO bus_type(type_name, description, status) VALUES(?,?,?)";
        return db.execute (sql, [type_name, description, status]);
    }
}

module.exports = busType;