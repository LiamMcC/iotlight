var express = require("express");
var app = express();
var mysql = require('mysql');
app.use(express.static("images"));

app.set('view engine', 'ejs'); // Set the template engine 
app.use(express.static("style"));
var bodyParser = require("body-parser") // call body parser module and make use of it
app.use(bodyParser.urlencoded({extended:true}));



// ******************************** Start of SQL **************************************** //
// First we need to tell the application where to find the database
const db = mysql.createConnection({
host: '127.0.0.1',
    user: 'root',
    port: '3306',
    password: 'Root',
    database: 'memory',
    multipleStatements: true
 });

// Next we need to create a connection to the database

db.connect((err) =>{
     if(err){
        console.log("go back and check the connection details. Something is wrong.")
    } 
     else{
        console.log('Looking good the database connected')
    }
})


// **********************************  Code from here **************************
app.get('/', function(req,res){
    let sql = 'SELECT * FROM rooms';
    let query = db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.render('home', {result})   
    });
    
})


app.get('/rooms/:id', function(req,res){
    let sql = 'SELECT * FROM items where roomRef = ?; SELECT * FROM rooms where id = ?';
    let query = db.query(sql,[req.params.id, req.params.id], (err,result) => {
        if(err) throw err;  
        console.log(result);
        res.render('room', {result})   
    });
    
})


app.get('/heater', function(req,res){
    let sql = 'SELECT * FROM items where id = ?';
    let query = db.query(sql,[6], (err,result) => {
        if(err) throw err;  
        console.log(result);
        res.render('heater', {result})   
    });
    
})

app.get('/switchon', function(req,res){
    let sql = 'update items set image = 1 where id = ?';
    let query = db.query(sql,[6], (err,result) => {
        if(err) throw err;  
        console.log(result);
        res.redirect('/heater')   
    });
    
})


app.get('/app', function(req,res){
   
        res.render('app')   
   
    
})


app.get('/add', function(req,res){

    res.render('add')


})


app.post('/add', function(req,res){
    let sql = 'insert into games ( title, price) values (?, ?)';
    let query = db.query(sql,[1, 1], (err,result) => {
        if(err) throw err;
        console.log(result);
        res.redirect( '/')   
    });
      
    
})







// **********************************  Code to here **************************

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" , function(){
  console.log("New Full Demo is Live")
});