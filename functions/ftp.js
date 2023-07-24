

exports = async function({query, headers, body}, response){
  
  const data = JSON.parse(body)
  console.log("data",data)
  
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
    //   client.end();
    // });
  
  });
  
  client.on('error', (err) => {
    console.error('FTP error:', err);
  });
  
  client.connect(ftpConfig);

  var serviceName = "mongodb-atlas";
  
  var dbName = "file";
  var collName = "docs";
  
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  return {"bien": "mal"}
};