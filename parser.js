const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'https://www.city.kharkov.ua/ru/';

puppeteer
    .launch()
    .then(function(browser) {
        return browser.newPage();
    })
    .then(function(page) {
        return page.goto(url).then(function() {
            return page.content();
        });
    })
    .then(function(html) {
        $('a.name', html)(function() {
            console.log($(this).text());
        });
    })
    .catch(function(err) {
        //handle error
    });