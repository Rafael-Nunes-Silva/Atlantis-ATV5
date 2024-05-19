const mysql = require("mysql2");

export function CreateConnection(): any {
    return mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "root",
        database: "atlantis",
        ssl: {
            rejectUnauthorized: false
        },
        dateStrings: "date"
    });
}

export function EndConnection(conn: any) {
    conn.end();
}

module.exports = { CreateConnection, EndConnection };