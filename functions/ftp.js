exports = async function({query, headers, body}, response){
  var serviceName = "mongodb-atlas";
  var dbName = "file";
  var collName = "docs";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  const dataFromReq = new Blob(body);
  console.log("asd", dataFromReq)

  console.log("body", body.blob())
  console.log("response", response)
  // const data = JSON.parse(body.text())
  
  // const myQuery = {"_id": BSON.ObjectId(data.id)};
  // const options = {
  //   "sort": { "fecha": -1 }
  // }

  // return collection.findOneAndDelete(myQuery, options)
  // .then(deletedDocument => {
  //   if(deletedDocument) {
  //     console.log(`Successfully deleted document that had the form: ${deletedDocument}.`)
  //   } else {
  //     console.log("No document matches the provided query.")
  //   }
  //   return deletedDocument
  // })
  // .catch(err => console.error(`Failed to find and delete document: ${err}`));
  return collection.find({})
};