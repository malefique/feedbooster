var Config = require('../config'),
    config = new Config(),
    async = require('async'),
    controllers = require('../controllers'),
    router = require('express').Router();

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

module.exports = function() {

    router.get('/', function(req, res) {

        var validationErrors = req.validationErrors();
        var mappedErrors = req.validationErrors(true);

        if (validationErrors) {

            res.status(400).jsonp({
                errors: util.inspect(mappedErrors),
                data: null
            });
            return;

        };

        async.parallel({
            page: function(callback){
                //console.log(controllers);
                controllers.soundcloud.getPage({},function(error, data) {
                    callback(error, data);
                });
            }
        }, function(error, data) {

            if (error) {

                res.status(500).send('500: Internal Server Error');
                return;

            }
            //console.log(data);
            res.render('index', {
                content: data
            });
            return;

        });

    });

    return router;
};





