const db = require('../db');

const feedback = {
    save: (feedback) => {
        const {user_id, bus_id, comment, rating, status} = feedback;
        const sql = `INSERT INTO feedback(user_id, bus_id, comment, rating,
                    status) VALUES(?,?,?,?,?)`;
        return db.execute(sql, [user_id, bus_id, comment, rating, status]);
    },

    findAll: () => {
        const sql = `SELECT * FROM feedback WHERE feedback.status=1
                    ORDER BY rating ASC`;
        return db.execute(sql);
    }
};

module.exports = feedback;