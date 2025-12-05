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
    }
};

module.exports = favouriteRoute;