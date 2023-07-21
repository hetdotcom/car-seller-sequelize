require('dotenv').config()

module.exports = {
    HOST: 'localhost',
    USER: 'root',
    // eslint-disable-next-line no-undef
    PASSWORD: 'L202@mysql.com#', //process.env.DB_PASS,
    DB: 'car_db',
    dialect: 'mysql',
    
    pool: {
        max: 5,
        min: 0,
        acquire: 40000,
        idle: 10000    
    }
}