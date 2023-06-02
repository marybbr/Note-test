import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { Preview } from "./pages/preview";
import { NoteList } from "./pages/home";
import { CreateNote } from "./pages/create";
import { EditNote } from "./pages/edit";
import { NoteLayout } from "./NoteLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/main.css";

function App() {
  const [notes, setNotes] = useLocalStorage("NOTES", []);
  const [tags, setTags] = useLocalStorage("TAGS", []);

  function addTag(tag) {
    setTags((prve) => [...prve, tag]);
  }

  function updateTag(id, label) {
    setTags((prvTag) => {
      return prvTag.map((tag) => {
        if (tag.id === id) return { ...tag, label };
        return tag;
      });
    });
  }
  function onDeleteTag(id) {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  }

  function onCreateNote({ tags, ...data }) {
    setNotes((prevNote) => {
      return [
        ...prevNote,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function onUpdateNote(id, { tags, ...data }) {
    setNotes((prvNotes) => {
      return prvNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  }

  function onDeleteNote(id) {
    // const newNote = notes.filter((note) => note.id !== id);
    // setNotes(newNote)

    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              notes={notesWithTags}
              availableTags={tags}
              updateTag={updateTag}
              onDeleteTag={onDeleteTag}
            />
          }
        />
        <Route
          path="/new"
          element={
            <CreateNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notes} />}>
          <Route
            index
            element={
              <Preview availableTags={tags} onDeleteNote={onDeleteNote} />
            }
          />
          <Route
            path="edit"
            element={
              <EditNote
                onUpdateNote={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/new" />} />
      </Routes>
    </Container>
  );
}

export default App;
