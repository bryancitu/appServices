exports = async function(req, res){
  var serviceName = "mongodb-atlas";
  var dbName = "file";
  var collName = "docs";
  
  const multer = require('multer');
  
  // Set up Multer storage
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Files will be uploaded to the 'uploads' folder
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Set unique filename for uploaded file
    },
  });
  
  const upload = multer({ storage: storage });
  

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  upload.single('file')(req, res, function (err) {
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

    console.log("FILEEE: ", req.file)
    client.on('ready', () => {
      client.put(req.file.path, `./home/test/${req.file.filename}`, function(err) {
        if (err) throw err;
        client.end();          
      });
    });

    client.on('error', (err) => {
      console.error('FTP error:', err);
    });

    client.connect(ftpConfig);
  });

  return collection.find({})
};