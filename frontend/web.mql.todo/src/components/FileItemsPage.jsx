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

export function FileItemsPage() {
  const { loading, files, ...fileActions } = useFiles();
  const { draftFiles, ...draftFileActions } = useDraftFiles();
  const showLoader = useShowLoader(loading, 200);
  return (
    <Container className="main-container" maxWidth="sm">
      {loading ? (
        showLoader ? (
          <LinearProgress />
        ) : null
      ) : (
        <div className="todo-items-container">
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
