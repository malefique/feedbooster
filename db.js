var mysql = require('mysql'),
    Config = require('./config'),
    config = new Config();
var mysqlConfig = config.mysql;
var pool = mysql.createPool(mysqlConfig);

module.exports = function (params, callback) {

    //Пытаемся соедениться с базой
    pool.getConnection(function (error, connection) {

        //Если произошла ошибка при соединении
        if (error) {

            //Возвращаем ошибку
            callback('Error in connection database', null);
            return;

        };

        //Выполняем запрос
        connection.query(params['query'], function (error, rows) {

            connection.release();

            if (!error) {

                //Возвращаем результат
                callback(null, rows);
                return;

            };

        });
    });

};