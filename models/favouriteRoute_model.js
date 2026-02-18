const db = require('../db');

const favouriteRoute = {

    // INSERT
    save: (favouriteRoute) => {
        const { user_id, route_id, status } = favouriteRoute;

        const sql = `
            INSERT INTO favourite_route (user_id, route_id, status)
            VALUES (?, ?, ?)
        `;

        return db.execute(sql, [user_id, route_id, status]);
    },

    // GET ALL (JOIN user + route)
    findAll: () => {
        const sql = `
            SELECT 
                fr.favourite_route_id,
                fr.user_id,
                u.name AS user_name,
                r.route_name
            FROM favourite_route fr
            LEFT JOIN user u ON fr.user_id = u.user_id
            LEFT JOIN route r ON fr.route_id = r.route_id
            WHERE fr.status = 1
            ORDER BY fr.favourite_route_id
        `;

        return db.execute(sql);
    },

    // GET BY ID
    findById: (id) => {
        const sql = `
            SELECT 
                fr.favourite_route_id,
                fr.user_id,
                u.name AS user_name,
                r.route_name
            FROM favourite_route fr
            LEFT JOIN user u ON fr.user_id = u.user_id
            LEFT JOIN route r ON fr.route_id = r.route_id
            WHERE fr.favourite_route_id = ? 
            AND fr.status = 1
        `;

        return db.execute(sql, [id]);
    },

    // SEARCH (user_id OR user_name OR route_name)
    findByText: (input) => {
        const searchText = `%${input}%`;

        const sql = `
            SELECT 
                fr.favourite_route_id,
                fr.user_id,
                u.name AS user_name,
                r.route_name
            FROM favourite_route fr
            LEFT JOIN user u ON fr.user_id = u.user_id
            LEFT JOIN route r ON fr.route_id = r.route_id
            WHERE (
                fr.user_id LIKE ? 
                OR u.name LIKE ? 
                OR r.route_name LIKE ?
            )
            AND fr.status = 1
        `;

        return db.execute(sql, [searchText, searchText, searchText]);
    },

    // UPDATE
    update: ({ id, user_id, route_id }) => {
        const sql = `
            UPDATE favourite_route
            SET user_id = ?, route_id = ?
            WHERE favourite_route_id = ?
        `;

        return db.execute(sql, [user_id, route_id, id]);
    },

    // SOFT DELETE
    delete: (id) => {
        const sql = `
            UPDATE favourite_route
            SET status = 0
            WHERE favourite_route_id = ?
        `;

        return db.execute(sql, [id]);
    }
};

module.exports = favouriteRoute;
