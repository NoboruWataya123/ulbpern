const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    'testdb',
    'postgres',
    'p00p1488',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        logging: false,
        sync: {force: true},
    }
)