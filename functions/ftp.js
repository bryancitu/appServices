exports = async function(arg){
  // This default function will get a value and find a document in MongoDB
  // To see plenty more examples of what you can do with functions see: 
  // https://www.mongodb.com/docs/atlas/app-services/functions/

  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "file";
  var collName = "docs";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css">
  <title>FTP-Orbisdata</title>
</head>
<body class="container">
  <main class="container p-3">
    <div class="row justify-content-center align-items-center main-row">
      <div class="col shadow main-col bg-white">
        <div class="row bg-primary text-white">
          <div class="col  p-2">
            <h4 class="text-center">FTP - OrbisData</h4>
          </div>
        </div>
        <div class="container mt-3">
          <form class="form-inline mb-3">
            <div class="form-group mb-2 mr-4">
              <label for="formFile" class="form-label"><b>Ingresa su archivo:</b></label>
              <input class="form-control-file" type="file" id="formFile">
            </div>
            <button type="button" onclick="CreateTodo();" class="btn btn-primary mb-2 ">Agregar</button>
          </form>
          <div class="row" id="docs">
          </div>
        </div>
      </div>
    </div>
    <form class="form-inline">
    </form>
  </main>
  <script>
    let data = ''

    const allData = async () => {
      try {
        const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/application-0-csgtt/endpoint/all');
        const res = await response.json();
        return res;
      } catch (error) {
        console.log(error);
      }
    }

    const deleteData = async (id) => {
      try {
        const response = await fetch("https://us-east-1.aws.data.mongodb-api.com/app/application-0-csgtt/endpoint/delete", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id}),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }

    const renderData = async () => {
      const res = await allData()
      let val = ''
      for (let i = 0; i < res.length; i++) {
        const element = res[i];
        valAct = 
        '<div class="col col-12 p-2 todo-item" todo-id="' + element._id +'">' +
          '<div class="input-group">' +
            '<input type="text" readonly class="form-control" aria-label="Text input with checkbox"' +
              'value="' + element.summary + '">' +
            '<div class="input-group-append">' +
              '<button class="btn btn-outline-secondary bg-danger text-white" type="button" onclick="DeleteFile(this);"' +
                'id="' + element._id + '">X</button>' +
            '</div>' +
          '</div>' +
        '</div>'
        val += valAct
      }
      data = val
    }
    renderData()

    const DeleteFile = async (e) => {
      const res = await deleteData(e.id)
      renderData()
      setTimeout(() => {
        document.getElementById("docs").innerHTML = data;
      }, 300)
    }

    setTimeout(() => {
      document.getElementById("docs").innerHTML = data;
    }, 1000)
  </script>
</body>
</html>
  `;
};