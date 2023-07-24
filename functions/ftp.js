exports = async function(req, response){
  var serviceName = "mongodb-atlas";
  var dbName = "file";
  var collName = "docs";
  const multer  = require('multer')
//   const storage = multer.diskStorage({
//   // destination: function (req, file, cb) {
//   //   // Set the destination directory where the files will be stored
//   //   cb(null, 'uploads/');
//   // },
//   filename: function (req, file, cb) {
//     // Set the filename of the uploaded file
//     console.log("file", file)
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });
  
  console.log("REQQQQ:", req)

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  // console.log("body.text()", body.text())
  // console.log("body.text()", Object.getOwnPropertyNames(body))
  // console.log("body.text()", body.fromText)
  // console.log("body.text()", Object.keys(body))
  // console.log("fileeeee", response)
  
  // const data = JSON.parse(body.text())


  return collection.find({})
};