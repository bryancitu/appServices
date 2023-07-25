exports = async function(req, res){
  var serviceName = "mongodb-atlas";
  var dbName = "file";
  var collName = "docs";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  const http = require('http');
  const multer = require('multer');
  var ftpStorage = require('multer-ftp')
  
  // Multer middleware for file uploads
  const storage = new ftpStorage({
    basepath: './home/test/', // The base path on the FTP server where files will be uploaded
    ftp: {
      host: 'synho.com',
      secure: false, // Set to true if using FTPS
      user: 'mar12syd',
      password: 'rvkfnshcjnvy',
    },
  });
  const upload = multer({ storage: storage });
  
  // Handle file upload when a POST request is made to the server
  upload.single('file')(req, res, function (err) {
    if (err) {
      return res.end('Error uploading file.', err);
    }

    res.end('File uploaded successfully.');
  });

  return collection.find({})
};