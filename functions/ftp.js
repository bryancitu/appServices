exports = async function(req, res){
  var serviceName = "mongodb-atlas";
  var dbName = "file";
  var collName = "docs";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  
  const multer = require('multer');
  
  // Set up Multer storage
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/'); // Files will be uploaded to the 'uploads' folder
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Set unique filename for uploaded file
    },
  });
  
  const upload = multer({ storage: storage });
  
  // Handle file upload when a POST request is made to the server
  upload.single('file')(req, res, function (err) {
    console.log("AQUIII", req)
    if (err) {
      return res.end('Error uploading file.', err);
    }

    const ftp = require('ftp');
    const client = new ftp();

    const ftpConfig = {
      host: 'synho.com',
      port: 21,
      user: 'mar12syd',
      password: 'rvkfnshcjnvy'
    };

    client.on('ready', () => {
      console.log('Connected to FTP server.');
      client.list("./home/test/",function(err, list) {
        if (err) throw err;
        console.log(list);
        client.end();
      });
    });

    client.on('error', (err) => {
      console.error('FTP error:', err);
    });

    client.connect(ftpConfig);

    res.end('File uploaded successfully.');
  });
  
  

  return collection.find({})
};