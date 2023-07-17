import React from "react";
import {
  Container,
  Button,
  Typography,
  List,
  LinearProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useFiles } from "../hooks/useFiles";
import { TodoItem } from "./TodoItem";
import { useDraftFiles } from "../hooks/useDraftFiles";
import { DraftTodoItem } from "./DraftTodoItem";
import { useShowLoader } from "../hooks/util-hooks";
import { MoreInfo } from "./MoreInfo";
import { getItemId } from "../utils";
import Client from 'ssh2-sftp-client';

export function FileItemsPage() {
  // const { loading, files, ...fileActions } = useFiles();
  const { draftFiles, ...draftFileActions } = useDraftFiles();
  const showLoader = useShowLoader(loading, 200);


  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Función asincrónica para conectar y obtener los archivos
    const connectAndFetchFiles = async () => {
      const config = {
        host: '192.168.0.103',
        port: '21',
        username: 'bryancitu',
        password: '199512',
      };

      const sftp = new Client();

      try {
        // Conexión al servidor SFTP
        await sftp.connect(config);
        console.log('Conexión establecida');

        // Obtener lista de archivos en el directorio remoto
        const remotePath = '/path/to/remote/directory';
        const files = await sftp.list(remotePath);
        console.log('Archivos encontrados:', files);

        // Actualizar el estado con los archivos obtenidos
        setFiles(files);
      } catch (err) {
        console.error('Error al conectar o obtener archivos:', err);
      } finally {
        // Cerrar la conexión
        sftp.end();
        console.log('Conexión cerrada');
      }
    };

    // Llamar a la función para conectar y obtener los archivos
    connectAndFetchFiles();
  }, []);



  return (
    <Container className="main-container" maxWidth="sm">
      {loading ? (
        showLoader ? (
          <LinearProgress />
        ) : null
      ) : (
        <div className="todo-items-container">

          <input type="file" name="" id="" />

          <Typography component="p" variant="h5">
            {`You have ${files.length} To-Do Item${
              files.length === 1 ? "" : "s"
            }`}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => draftFileActions.createDraftFile()}
          >
            Add To-Do
          </Button>
          <List style={{ width: "100%" }}>
            {files.map((todo) => (
              <TodoItem
                key={getItemId(todo)}
                todo={todo}
                fileActions={fileActions}
              />
            ))}
            {draftFiles.map((draft) => (
              <DraftTodoItem
                key={getItemId(draft)}
                todo={draft}
                fileActions={fileActions}
                draftFileActions={draftFileActions}
              />
            ))}
          </List>
        </div>
      )}
      <MoreInfo />
    </Container>
  );
}
