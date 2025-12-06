const feedbacks = require('../controllers/feedback_controller');
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
    },

    findById: (id) => {
        const sql = `SELECT * FROM feedback WHERE feedback_id=?
                    AND feedback.status=1`;
        return db.execute(sql,[id]);
    },

    findByText: (input) => {
        const searchText = `%${input}%`;
        const sql = `SELECT * FROM feedback WHERE user_id LIKE ? OR
                    bus_id LIKE ? OR comment LIKE ? OR rating LIKE ?
                    AND feedback.status=1`;
        return db.execute(sql,[searchText,searchText,searchText,searchText]);
    },

    update: (feedback) => {
        const {id, user_id, bus_id, comment, rating} = feedback;
        const sql = `UPDATE feedback SET user_id=?, bus_id=?, comment=?,
                    rating=? WHERE feedback_id=?`;
        return db.execute(sql,[user_id, bus_id, comment, rating, id]);
    }
};

module.exports = feedback;