exports = async function({query, headers, body}, response){
  var serviceName = "mongodb-atlas";
  var dbName = "file";
  var collName = "docs";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  console.log(body.text())
  
  // const query = {"_id": BSON.ObjectId(arg)};
  // const options = {
  //   "sort": { "fecha": -1 }
  // }

  // return collection.findOneAndDelete(query, options)
  // .then(deletedDocument => {
  //   if(deletedDocument) {
  //     console.log(`Successfully deleted document that had the form: ${deletedDocument}.`)
  //   } else {
  //     console.log("No document matches the provided query.")
  //   }
  //   return deletedDocument
  // })
  // .catch(err => console.error(`Failed to find and delete document: ${err}`));
  return body.text()
};