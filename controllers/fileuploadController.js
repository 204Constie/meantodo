var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
var path = require('path');

module.exports = function(app) {
  var upload = multer({
    dest: path.join(__dirname, '../public/app/images')
  });

  // ...

  app.post('/file-upload', upload.single('thumbnail'), function(req, res) {
    if (req.file) {
      console.dir(req.file);
      // return res.end('Thank you for the file');
    }
    // res.end('Missing file');
    res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write('Code: '+code);
    res.write('<script>setTimeout(function () { window.location.href = "http://localhost:3000"; }, 1000);</script>');
    res.end();
  });

  // app.use(bodyParser.urlencoded({uploadDir:'../uploads'}));
  //
  // app.post('/api/file-upload', function(req, res) {
  //   console.log('file upload');
  //     // get the temporary location of the file
  //   var tmp_path = req.files.thumbnail.path;
  //   // set where the file should actually exists - in this case it is in the "images" directory
  //   var target_path = '../public/assets/' + req.files.thumbnail.name;
  //   // move the file from the temporary location to the intended location
  //   fs.rename(tmp_path, target_path, function(err) {
  //       if (err) throw err;
  //       // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
  //       fs.unlink(tmp_path, function() {
  //           if (err) throw err;
  //           res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
  //       });
  //   });
  // });

}
