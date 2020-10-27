const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// connection configurations
const mysqlCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'curriculaWeb'
});
 
// connect to database
mysqlCon.connect(function(err) {
  if (err) throw err;
  console.log("Connectado a BD!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/index.js', (req, res) => {
  res.sendFile(__dirname + '/index.js');
});

app.get('/fotos/:id', (req, res) => {
  res.sendFile(__dirname + "/fotos/" + req.params.id);
});

app.get('/getSections', (req, res) => {
  mysqlCon.query("select * from sections", function (error, results) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
})

app.get('/getSubsections', (req, res) => {
  mysqlCon.query("select * from subsections", function (error, results) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
})

app.get('/getImgs', (req, res) => {
  mysqlCon.query("select * from imgs", function (error, results) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
})