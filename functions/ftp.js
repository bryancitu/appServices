exports = async function({query, headers, body}, response){
  var serviceName = "mongodb-atlas";
  var dbName = "file";
  var collName = "docs";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  console.log("body", body)
  const byteArray = new Uint8Array(body);
  console.log("byteArray",byteArray);

  
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
  
    const date = new Date().valueOf()
    // client.put('index.html', `./home/test/index${date}.html`, function(err) {
    //   if (err) throw err;
    // });
    client.end();
  
  });
  
  client.on('error', (err) => {
    console.error('FTP error:', err);
  });
  
  client.connect(ftpConfig);

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