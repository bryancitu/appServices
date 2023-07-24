exports = async function({query, headers, body, file}, response){
  var serviceName = "mongodb-atlas";
  var dbName = "file";
  var collName = "docs";
  const formidable = require('formidable')

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  console.log("body.text()", body.text())
  console.log("fileeeee", response.file)
  
  const form = formidable({multiples: true});
  [fields, files] = await form.parse(req);
  console.log("fields", fields)
  console.log("files", files)
  // const data = JSON.parse(body.text())


  return collection.find({})
};