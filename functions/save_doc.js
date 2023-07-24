exports = async function(arg){
  var serviceName = "mongodb-atlas";
  var dbName = "file";
  var collName = "docs";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  var findResult;
  try {
    collections = await collection.find({});
    const newItem = {
      "summary": "ver partido 3",
      "fecha": new Date()
    }
    collection.insertOne(newItem)

  } catch(err) {
    console.log("Error occurred while executing findOne:", err.message);

    return { error: err.message };
  }

  // To call other named functions:
  // var result = context.functions.execute("function_name", arg1, arg2);

  return collection.find({}).sort({ fecha: -1 });
};