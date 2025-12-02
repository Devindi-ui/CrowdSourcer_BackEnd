const db = require('../db');

const busType = {
    save: (busType) => {
        const {type_name, description, status} = busType;
        const sql = "INSERT INTO bus_type(type_name, description, status) VALUES(?,?,?)";
        return db.execute (sql, [type_name, description, status]);
    },

    findAll: () => {
        const sql = `SELECT * FROM bus_type WHERE bus_type.status=1
                    ORDER BY type_name DESC`;
        return db.execute(sql);
    },

    findById: (id) => {
        const sql = `SELECT * FROM bus_type WHERE bus_type_id=?
                    AND bus_type.status=1`;
        return db.execute(sql,[id]);
    },

    findByText: (input) => {
        const searchText = `%${input}%`
        const sql = `SELECT * FROM bus_type WHERE type_name LIKE ? OR 
                    description LIKE ? OR status LIKE ? AND bus_type.status=1`;
        return db.execute(sql, [searchText,searchText,searchText]);
    }
}

module.exports = busType;