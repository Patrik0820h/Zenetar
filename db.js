import mysql from 'mysql2/promise'

const dbconfig = {
    host: 'localhost' || process.env.host,
    user: 'root' || process.env.user,
    password: '' || process.env.password,
    database: 'zenetar' || process.env.database,
    port: 3307 || process.env.port
}

const pool = mysql.createPool(dbconfig);

export default pool