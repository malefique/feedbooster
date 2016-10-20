/**
 * Created by oleg on 19.10.16.
 */

var config = {};

config.login = 'login';
config.password = 'ps';

var production = {};
production.appPort = 8011;
production.mysql = {};
production.mysql.connectionLimit = 10;
production.mysql.host = 'localhost';
production.mysql.port = 3306;
production.mysql.user = 'root';
production.mysql.password = 'root';
production.mysql.database = 'tst';
production.mysql.debug = false;

var dev = {};
dev.appPort = 8011;
dev.mysql = {};
dev.mysql.connectionLimit = 10;
dev.mysql.host = 'localhost';
dev.mysql.port = 3306;
dev.mysql.user = 'root';
dev.mysql.password = 'root';
dev.mysql.database = 'tst';
dev.mysql.debug = true;

var local = {};
local.appPort = 8011;
local.mysql = {};
local.mysql.connectionLimit = 10;
local.mysql.host = 'localhost';
local.mysql.port = 3306;
local.mysql.user = 'root';
local.mysql.password = 'root';
local.mysql.database = 'tst';
local.mysql.debug = true;

module.exports = function () {
    switch (process.env.NODE_ENV) {
        case 'dev':
            return Object.assign(config, dev);

        case 'production':
            return Object.assign(config, production);

        default:
            return Object.assign(config, local);
    }
};