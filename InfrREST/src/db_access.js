const express = require("express");
const app = express();
var rsltRow;

app.get("/dbaccess", (req, res) => {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
    host: "localhost",
    user: "infra",
    password: "manager",
    database: "infrared"
    });
    connection.connect();
    console.log("db connect successfully.");
    connection.query('SELECT location,description  from image ;', (err, rows, fields) => {
        if (err) { console.log('err: ' + err); } 
	else {
	    rsltRow = rows
	    console.log(JSON.stringify(rsltRow));
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	    res.send(JSON.stringify(rsltRow));
	}
    });

    connection.end();
});
    
    
app.get("/getpatientimages", (req, res) => {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
    host: "localhost",
    user: "infra",
    password: "manager",
    database: "infrared"
    });
    console.log(req.query.userid);
    connection.connect();
    console.log("db connect successfully.");
    connection.query('SELECT location,description  from image  WHERE userid=' + req.query.userid + ';', (err, rows, fields) => {
        if (err) { console.log('err: ' + err); } 
	else {
	    rsltRow = rows
	    console.log(JSON.stringify(rsltRow));
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	    res.send(JSON.stringify(rsltRow));
	}
    });

    connection.end();
});
app.get("/getpatients", (req, res) => {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
    host: "localhost",
    user: "infra",
    password: "manager",
    database: "infrared"
    });
    connection.connect();
    console.log("db connect successfully.");
    connection.query('SELECT DISTINCT userid  from image ;', (err, rows, fields) => {
        if (err) { console.log('err: ' + err); } 
	else {
	    rsltRow = rows
	    console.log(JSON.stringify(rsltRow));
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	    res.send(JSON.stringify(rsltRow));
	}
    });

    connection.end();
});
app.listen(3001);
