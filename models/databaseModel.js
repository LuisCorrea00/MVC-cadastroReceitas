const mysql = require("mysql2");

class Database {
    static connect() {
        return mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASS,
        });
    }

    static query(sql, callback) {
        const connection = this.connect();

        connection.query(sql, (err, res) => {
            if (err) console.error(err);
            if (callback) callback(res);
        });
    }
}

module.exports = Database;
