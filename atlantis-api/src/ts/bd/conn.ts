const mysql = require("mysql2");

export function CreateConnection(): any {
    return mysql.createConnection({
        host: "127.0.0.1:3306",
        user: "root",
        password: "fatec",
        ssl: {
            rejectUnauthorized: false
        }
    });
}

export function EndConnection(conn: any) {
    conn.end();
}