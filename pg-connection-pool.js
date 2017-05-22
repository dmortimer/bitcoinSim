var pg = require('pg');
var url = require('url');
try {
// When not running via Heroku, this will load the .env file.
require('dotenv').config();
} catch (e) {
// When running with Heroku, dotenv doesn't need to be available.
}
console.info("DATABASE_URL:", process.env.DATABASE_URL);
var params = url.parse(process.env.DATABASE_URL);
var auth = params.auth.split(':');
var config = {
 user: auth[0],
 password: auth[1],
 host: params.hostname,
 port: params.port,
 database: params.pathname.split('/')[1],
 ssl: params.hostname !== 'localhost'
};
module.exports = new pg.Pool(config);
