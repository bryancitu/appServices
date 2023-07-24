exports = async function({query, headers, body}, response){
  var serviceName = "mongodb-atlas";
  var dbName = "file";
  var collName = "docs";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  console.log(body.text())
  // const data = JSON.parse(body.text())


  return collection.find({})
};