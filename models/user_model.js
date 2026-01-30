const db = require('../db');

const user = {
    save: (user) => {
        const {name, email, password, phone, role_id, status_d} = user;
        const sql = `INSERT INTO user (name, email, password, phone, role_id, 
                     status_d) VALUES (?,?,?,?,?,?)`;
        return db.execute(sql, [name,email,password,phone,role_id, status_d]);
    },

    findAll: async() => {
        const [rows] = await db.query (`
                    SELECT 
                        u.user_id,
                        u.name,
                        u.email,
                        u.phone,
                        r.role_name 
                    FROM user u
                    LEFT JOIN role r ON u.role_id = r.role_id
                    WHERE u.status_d = 1 
                    ORDER BY u.name DESC
        `);
        return rows;
    },

    findById: async(id) => {
        const [rows] = await db.query (`
            SELECT 
                u.user_id,
                u.name,
                u.email,
                u.phone,
                r.role_name
            FROM user u 
            LEFT JOIN role r ON u.role_id = r.role_id 
            WHERE u.user_id = ? 
            AND u.status_d=1
        `, [id]);
        return rows[0];
    },

    findByText: async(input) => {
        const searchText = `%${input}%`;
        const [rows] = await db.query (`
                    SELECT 
                      u.user_id,
                      u.name,
                      u.email,
                      u.phone,
                      r.role_name
                    FROM user u
                    LEFT JOIN role r ON u.role_id = r.role_id 
                    WHERE (
                      u.name LIKE ? 
                      OR u.email LIKE ? 
                      OR u.phone LIKE ? 
                      OR r.role_name LIKE ?
                    )
                    AND u.status_d = 1
        `,
        [searchText, searchText, searchText, searchText]);
        return rows;
    },

    update: (user) => {
        const {id, name, email, password, phone, role_id} = user;
        const sql = `
            UPDATE user 
            SET name=?, email=?, password=?, phone=?, role_id=? 
            WHERE user_id = ?
        `;
        return db.execute(sql, [name, email, password, phone, role_id, id]);
    },

    delete: (id) => {
        const sql = "UPDATE user SET status_d = 0 WHERE user_id = ?";
        return db.execute(sql, [id]);
    }

}; 

module.exports = user; 