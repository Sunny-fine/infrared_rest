const express = require("express");
const app = express();
var rsltRow;
let path = "/home/ypwang/var/www/html/images/";

app.get("/analysisdata", (req, res) => {
    let location = req.query.location;
    console.log("location=" + location);
    let index = location.lastIndexOf("/");
    let description = location.substring(index+1);
    var json = require(path + description + ".json");
	    console.log(json);
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	    res.send(json);

});

app.listen(3005, function() {
    console.log('App running on port 3005');
});
