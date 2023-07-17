import React from "react";
import { useWatch } from "./useWatch";
import { useCollection } from "./useCollection";
import { useApp } from "../components/RealmApp";
import atlasConfig from "../atlasConfig.json";
import {
  addValueAtIndex,
  replaceValueAtIndex,
  updateValueAtIndex,
  removeValueAtIndex,
  getTodoIndex,
} from "../utils";

const { dataSourceName } = atlasConfig;

export function useFiles() {
  // Set up a list of todos in state
  const app = useApp();
  const [files, setFiles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Get a client object for the todo item collection
  const fileItemCollection = useCollection({
    cluster: dataSourceName,
    db: "delivery",
    collection: "usuarios",
  });

  // Fetch all todos on load and whenever our collection changes (e.g. if the current user changes)
  React.useEffect(() => {
    let shouldUpdate = true;
    const fetchFiles = fileItemCollection.find({})
    if (shouldUpdate) {
      fetchFiles.then((fetchedFiles) => {
        setFiles(fetchedFiles);
        setLoading(false);
      });
    }
    return () => {
      shouldUpdate = false;
    }
  }, [fileItemCollection]);

  // Use a MongoDB change stream to reactively update state when operations succeed
  useWatch(fileItemCollection, {
    onInsert: (change) => {
      setFiles((oldFiles) => {
        if (loading) {
          return oldFiles;
        }
        const idx =
          getTodoIndex(oldFiles, change.fullDocument) ?? oldFiles.length;
        if (idx === oldFiles.length) {
          return addValueAtIndex(oldFiles, idx, change.fullDocument);
        } else {
          return oldFiles;
        }
      });
    },
    onUpdate: (change) => {
      setFiles((oldFiles) => {
        if (loading) {
          return oldFiles;
        }
        const idx = getTodoIndex(oldFiles, change.fullDocument);
        return updateValueAtIndex(oldFiles, idx, () => {
          return change.fullDocument;
        });
      });
    },
    onReplace: (change) => {
      setFiles((oldFiles) => {
        if (loading) {
          return oldFiles;
        }
        const idx = getTodoIndex(oldFiles, change.fullDocument);
        return replaceValueAtIndex(oldFiles, idx, change.fullDocument);
      });
    },
    onDelete: (change) => {
      setFiles((oldFiles) => {
        if (loading) {
          return oldFiles;
        }
        const idx = getTodoIndex(oldFiles, { _id: change.documentKey._id });
        if (idx >= 0) {
          return removeValueAtIndex(oldFiles, idx);
        } else {
          return oldFiles;
        }
      });
    },
  });

  // Given a draft todo, format it and then insert it
  const saveFile = async (draftTodo) => {
    if (draftTodo.summary) {
      draftTodo.owner_id = app.currentUser.id;
      try {
        await fileItemCollection.insertOne(draftTodo);
      } catch (err) {
        if (err.error.match(/^Duplicate key error/)) {
          console.warn(
            `The following error means that this app tried to insert a todo multiple times (i.e. an existing todo has the same _id). In this app we just catch the error and move on. In your app, you might want to debounce the save input or implement an additional loading state to avoid sending the request in the first place.`
          );
        }
        console.error(err);
      }
    }
  };

  // Toggle whether or not a given todo is complete
  const toggleFile = async (file) => {
    await fileItemCollection.updateOne(
      { _id: file._id },
      { $set: { isComplete: !file.isComplete } }
    );
  };

  // Delete a given todo
  const deleteFile = async (file) => {
    await fileItemCollection.deleteOne({ _id: file._id });
  };

  return {
    loading,
    files,
    saveFile,
    toggleFile,
    deleteFile,
  };
}
