const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'usman',
        password: "khan",
        database: 'tasks',
        port: 3306,

    }
})

module.exports = { knex };
