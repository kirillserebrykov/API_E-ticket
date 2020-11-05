const puppeteer = require('puppeteer');

const $ = require('cheerio');

const url = 'https://www.city.kharkov.ua/ru/';


module.exports = new Promise(  function(res,req) {
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
     .then( function(html) {
         $('a.name', html).each(async function() {
             let listNews = {title :null , url :null}
            let str
              str =$(this).text()

            let   firstElem = $(this).get()
            let str2

             str2 =$(firstElem).attr('href')
             listNews.url =str2
             listNews.title = str
             res(listNews)










        });


    })


    .catch(function(err) {
        //handle error
    })


})

