const express = require('express');
const url = require('url');
const port = process.env.PORT || 6080
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs')
const cors = require('cors')
const corsOptions = {
    origin: "*",// домен сервиса, с которого будут приниматься запросы
    optionsSuccessStatus: 200 // для старых браузеров
}

app.use(cors(corsOptions));
const dataCart = [{
  "0436662A5F6A80" : {
      "Status" : 'green',
    "balans": 500,
      "error": undefined
  },
  "1438792B5F6A10" : {
    "balans": 20
  }
}]
let jsonParser = bodyParser.json();



app.get('/getCart' ,(req, res,err) => {
  const queryObject = url.parse(req.url,true).query;

 let fancmap = () =>{
  let IDcart = dataCart.map(function(el) {
      try {

          if(JSON.stringify(el[queryObject.cart]["balans"] >= 0)){

              res.end( JSON.stringify(el[queryObject.cart]))
          }

          else {  }

      }catch (e ){res.end(JSON.stringify({error: "Error" , status : 'red',}))}


  });
 }
 fancmap()
    res.end('Api E-ticket')

})
app.put('/putBalansCart',jsonParser, function (req, res) {
    let editCartData = (req,res) =>{
        let IDcart = dataCart.map(function(el) {

                if (req.body['0436662A5F6A80'].balans > 500) {
                    el['0436662A5F6A80'].balans = 500
                    return
                }
              else {el['0436662A5F6A80'].balans =  el['0436662A5F6A80'].balans - req.body['0436662A5F6A80'].balans}
            res.end(JSON.stringify(el['0436662A5F6A80']))
        })}
        editCartData(req,res)
})

app.post('/postEditBalansCart',jsonParser,cors(corsOptions), function (req, res) {

        let editCartData = (req,res) =>{
            let IDcart = dataCart.map(function(el) {
                    el['0436662A5F6A80'].balans =  req.body['0436662A5F6A80'].balans
                    console.log()
                    res.end(JSON.stringify(el['0436662A5F6A80']))})}
                editCartData(req,res)})

app.options('*', cors()) 

let getFail = (name ,path) =>{
    app.get('/'+ name , function(req, res) {
        res.sendFile(__dirname + "/" + path);
    })
}


getFail('main.js',"doc/main.js")
getFail('','/doc/index.html')
getFail('main.css','/doc/main.css')
getFail('req.JPG','/doc/req.JPG')
getFail('Error.JPG','/doc/Error.JPG')
getFail('res.JPG','/doc/res.JPG')



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

