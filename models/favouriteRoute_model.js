const db = require('../db');

const favouriteRoute = {
    save: (favouriteRoute) => {
        const {user_id, route_id, status} = favouriteRoute;
        const sql = `INSERT INTO favourite_route(user_id, route_id, 
                    status) VALUES(?,?,?)`;
        return db.execute(sql, [user_id, route_id, status]);
    },

    findAll: () => {
        const sql = `SELECT * FROM favourite_route WHERE  
                    favourite_route.status=1 ORDER BY favourite_route_id`;
        return db.execute(sql);
    },

    findById: (id) => {
        const sql = `SELECT * FROM favourite_route WHERE 
                    favourite_route_id=? AND favourite_route.status=1`;
        return db.execute(sql,[id]);
    },

    findByText: (input) => {
        const searchText = `%${input}%`;
        const sql = `SELECT * FROM favourite_route WHERE user_id LIKE ? 
                    OR route_id LIKE ? AND favourite_route.status=1`;
        return db.execute(sql,[searchText,searchText]);
    }
};

module.exports = favouriteRoute;