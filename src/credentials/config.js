const { Pool } = require('pg')
require( 'dotenv' ).config()

 const credentials = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        allowExitOnIdle: true

}

const pool = new Pool(credentials)

module.exports = pool