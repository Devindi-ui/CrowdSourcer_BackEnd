const db = require('../db');

const favouriteRoute = {
    save: (favouriteRoute) => {
        const {user_id, route_id, status} = favouriteRoute;
        const sql = `INSERT INTO favourite_route(user_id, route_id, 
                    status) VALUES(?,?,?)`;
        return db.execute(sql, [user_id, route_id, status]);
    }
};

module.exports = favouriteRoute;