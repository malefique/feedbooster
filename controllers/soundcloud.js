var dbQuery = require('../db'),
    mysql = require('mysql'),
    controllers = require('../controllers'),
    async = require('async'),
    Config = require('../config'),
    config = new Config(),
    curl = require('curljs'),
    jsdom = require("jsdom"),
    Browser = require('zombie'),
    fs = require('fs'),
    jQuery = require('jquery');

function logLastResponse(res){
    fs.writeFile('./debug/last.html',res,function() {});
    return;
}

exports.getPage = function(params, callback) {
    //var dataObject = {firstParam : "first value", secondParam : "second value"};
    /*var curlOpts = curl.opts.silent()
        .ignore_cert()
        .follow_redirects()
        .max_redirs(5)
        .connect_timeout(3);*/
        //.post_data(dataObject);

    /*curl("soundcloud.com", curlOpts, function(err, data, stderr) {

        jsdom.env(
            data,
            ["http://code.jquery.com/jquery.js"],
            function (err, window) {
                var $ = window.$;
                $("a").each(function(i,v){
                   console.log($(v).text()+'\r\n');
                });
                callback(null,data)
                //console.log("there have been", window.$("a").length - 4, "io.js releases!");
            }
        );
    });*/
    var time = new Date().getHours();
    //Browser.localhost('soundcloud.com', 8011);
    var user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36';
    var browser = new Browser({userAgent: user_agent, debug: false, waitFor: 1000});
    browser.visit('http://portal.trend-spb.ru/', function(){
        browser.fill('USER_LOGIN',config.login).fill('USER_PASSWORD',config.password).pressButton('.login-btn',function(){
            browser.wait(1000, function() {
                var $ = jQuery(browser.window);
                $('#timeman-block').trigger('click');
                browser.wait(1000, function() {
                    if($('.tm-popup-timeman-layout .tm-popup-button-handler').text() == 'Завершить рабочий день'){
                        if(time >= 19)
                            $('.tm-popup-timeman-layout .tm-popup-button-handler').trigger('click');
                    }
                    else{
                        $('.tm-popup-timeman-layout .tm-popup-button-handler').trigger('click');
                    }
                    browser.wait(1000, function() {
                        callback(null,{
                            status: 'Статус: '+ $('.tm-popup-timeman-layout .tm-popup-button-handler').text(),
                            time: 'Время: '+($('.tm-popup-notice-time').text().length == 6 ? $('.tm-popup-notice-time').text().substr(0,2) + 'ч.' + $('.tm-popup-notice-time').text().substr(2,4) + 'мин.' : $('.tm-popup-notice-time').text().substr(0,1) + 'ч.' + $('.tm-popup-notice-time').text().substr(1,2) + 'мин.')
                        }
                        );
                    });
                });

                logLastResponse(browser.html());
                //browser.clickLink('#timeman-container', function(){
                  //  browser.clickLink('.tm-popup-timeman-layout .tm-popup-button-handler', function(){
                  //     logLastResponse(browser.html());
                  //  });
                //});
            });
        });
    });
    //var browser = new Browser();
    //browser.debug();
    //browser.visit('https://soundcloud.com/signin/', function(e,b,s){
        /*console.log(s);
        fs.writeFile('./debug/last.html',b.html(),function(){
            b.wait(4000, function(e,b,s){
                b.fill('username',    'novocaineya@gmail.com')
                    .pressButton('Continue',function(e,b,s){
                        b.fill('password', '343995176').pressButton('Sign in', function(e,b,s){
                            //console.log(b.html());
                            //console.log(browser.success);
                            console.log(browser.location.href);
                            //callback(null,browser.location.href);
                        });
                    });
            });*/
        /*browser.pressButton('Sign in',function(e,br){

            });*/


        //});
        //console.log(browser.html());
        //browser.assert.text('title', 'Stack Overflow');
        /*browser.wait(100, function (){

            browser.pressButton('Sign in',function(e,br){
                console.log(br.html());
                browser.fill('username',    'novocaineya@gmail.com')
                    .pressButton('Continue',function(){
                        browser.fill('password', '343995176').pressButton('Sign in', function(e,br){
                            console.log(browser.html());
                            console.log(browser.success);
                            console.log(browser.location.href);
                            callback(null,browser.location.href);
                    });
                });
            });
        });*/

    //});

};