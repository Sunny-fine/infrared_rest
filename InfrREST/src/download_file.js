var path = require('path');
var mime = require('mime');
var fs = require('fs');
var express = require('express');
var app = express();
const { exec } = require('child_process');

var dirname = '/home/ypwang/var/www/html/';

app.get('/download', function(req, res){
  exec('zip ' + '/home/ypwang/var/www/html/Infrared.zip -r ' + '/home/ypwang/var/www/html/images', (err, stdout, stderr) => {
	if (err) {
	  console.err(err);
	}
	else {
	  console.log('zip created');
	  var file = dirname + 'Infrared.zip';

  	 var filename = path.basename(file);
  	 var mimetype = mime.lookup(file);

  	 res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  	 res.setHeader('Content-type', mimetype);

  	 var filestream = fs.createReadStream(file);
  	 filestream.pipe(res);
	}
  }); 
});
app.listen(3004, function() {
    console.log('App running on port 3004');
});
