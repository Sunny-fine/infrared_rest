var express = require("express");
var app = express();
var multer = require("multer");
var cors = require("cors");

app.use(cors());

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    user: "infra",
    password: "manager",
    database: "infrared"
});
	  connection.connect();
	  console.log("db connect successfully.");
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	cb(null, '/home/ypwang/var/www/html/images')
        },
    	filename: function (req, file, cb) {
	  cb(null, file.originalname)
	  let location = "http://133.18.23.48:8080/images/" + file.originalname;
	  let tail = location.slice(-4);
	  if (tail == 'json') {
	    console.log("location=" + location);
	    //var json = require(location);
	    //console.log(json);
            let image = location.slice(0, location.length-5);
	    connection.query("INSERT INTO imagedata VALUES(NULL,111111,'" + image + "','" + location + "');", (err, results) => {
	      if (err) { console.log("err:" + err); }
           });

	  }
	  else {
	    console.log("location=" + location);
	    let index = location.lastIndexOf("/");
	    let description = location.substring(index+1);
	    console.log("description=" + description);
	    connection.query("INSERT INTO image VALUES(NULL,111111,sysdate(),1,'" + location + "','" + description + "');", (err, results) => {
	      if (err) { console.log("err:" + err); }
           });
	 }
	}
})

var upload = multer({storage: storage}).array("file")

app.post('/upload', function(req, res) {

    upload(req, res, function (err) {
	if (err instanceof multer.MulterError) {
	    console.log(err);
	    return res.status(500).json(err)
	} 
	else if (err) {
	    console.log(err);
	    return res.status(500).json(err)
	}
      return res.status(200).send(req.file)
    })
});

app.listen(3003, function() {
    console.log('App running on port 3003');
});
