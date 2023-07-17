import React from "react";
import { createObjectId } from "../utils";

export function useDraftFiles() {
  const [drafts, setDrafts] = React.useState([]);

  const createDraftFile = () => {
    const draftFile = {
      _id: createObjectId(),
      summary: "",
      isComplete: false,
    };
    setDrafts((d) => [...d, draftFile]);
  };

  const setDraftFileSummary = (draft, summary) => {
    setDrafts((oldDrafts) => {
      const idx = oldDrafts.findIndex((d) => d._id === draft._id);
      return [
        ...oldDrafts.slice(0, idx),
        { ...oldDrafts[idx], summary },
        ...oldDrafts.slice(idx + 1),
      ];
    });
  };

  const deleteDraftFile = (draft) => {
    setDrafts((oldDrafts) => {
      const idx = oldDrafts.findIndex((d) => d._id === draft._id);
      return [...oldDrafts.slice(0, idx), ...oldDrafts.slice(idx + 1)];
    });
  };

  return {
    draftFiles: drafts,
    createDraftFile,
    setDraftFileSummary,
    deleteDraftFile,
  };
}
