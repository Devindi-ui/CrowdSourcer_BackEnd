const db = require('../db');

const feedback = {

    save: (feedback) => {
        const {user_id, bus_id, comment, rating, status} = feedback;
        const sql = `
            INSERT INTO feedback (user_id, bus_id, comment, rating, status)
            VALUES (?, ?, ?, ?, ?)
        `;
        return db.execute(sql, [user_id, bus_id, comment, rating, status]);
    },

    findAll: () => {
        const sql = `
            SELECT 
                f.feedback_id,
                f.user_id,
                u.name AS user_name,
                f.bus_id,
                b.bus_number,
                r.route_name,
                f.comment,
                f.rating
            FROM feedback f
            LEFT JOIN user u ON f.user_id = u.user_id
            LEFT JOIN bus b ON f.bus_id = b.bus_id
            LEFT JOIN route r ON b.route_id = r.route_id
            WHERE f.status = 1
            ORDER BY f.feedback_id DESC
        `;
        return db.execute(sql);
    },

    findById: (id) => {
        const sql = `
            SELECT 
                f.feedback_id,
                f.user_id,
                u.name AS user_name,
                f.bus_id,
                b.bus_number,
                r.route_name,
                f.comment,
                f.rating
            FROM feedback f
            LEFT JOIN user u ON f.user_id = u.user_id
            LEFT JOIN bus b ON f.bus_id = b.bus_id
            LEFT JOIN route r ON b.route_id = r.route_id
            WHERE f.feedback_id = ? AND f.status = 1
        `;
        return db.execute(sql, [id]);
    },

    findByText: (input) => {
        const searchText = `%${input}%`;
        const sql = `
            SELECT 
                f.feedback_id,
                f.user_id,
                u.name AS user_name,
                f.bus_id,
                b.bus_number,
                r.route_name,
                f.comment,
                f.rating
            FROM feedback f
            LEFT JOIN user u ON f.user_id = u.user_id
            LEFT JOIN bus b ON f.bus_id = b.bus_id
            LEFT JOIN route r ON b.route_id = r.route_id
            WHERE (
                f.comment LIKE ?
                OR f.user_id LIKE ?
                OR b.bus_number LIKE ?
            )
            AND f.status = 1
            ORDER BY f.feedback_id DESC
        `;
        return db.execute(sql, [searchText, searchText, searchText]);
    },

    update: (feedback) => {
        const {id, user_id, bus_id, comment, rating} = feedback;
        const sql = `
            UPDATE feedback
            SET user_id = ?, bus_id = ?, comment = ?, rating = ?
            WHERE feedback_id = ? AND status = 1
        `;
        return db.execute(sql, [user_id, bus_id, comment, rating, id]);
    },

    delete: (id) => {
        const sql = `
            UPDATE feedback
            SET status = 0
            WHERE feedback_id = ?
        `;
        return db.execute(sql, [id]);
    }
};

module.exports = feedback;
