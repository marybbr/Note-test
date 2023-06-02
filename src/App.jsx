import { useMemo, createContext, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useLocalStorage } from "./useLocalStorage";
import { Preview } from "./pages/preview";
import { NoteList } from "./pages/home";
import { CreateNote } from "./pages/create";
import { EditNote } from "./pages/edit";
import { NoteLayout } from "./NoteLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/main.css";

export const TagContext = createContext(null);
const baseURL = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const [notes, setNotes] = useLocalStorage("NOTES", []);
  const [tags, setTags] = useLocalStorage("TAGS", []);
  const [activeTab, setActiveTab] = useState(1);

  function splitArray(arr, n) {
    const chunkSize = 5;
    const startIndex = (n - 1) * chunkSize;
    return [...arr].splice(startIndex, chunkSize);
  }

  // const { data: posts } = useQuery(["post-list"], getPosts, {
  //   onSuccess: (res) => {
  //     res.data?.map((post) => {
  //       const randomTags = [tags[Math.floor(Math.random() * tags.length)].id];
  //       const randomColor = [color[Math.floor(Math.random() * color.length)]];
  //       setNotes((prv) => [
  //         ...prv,
  //         {
  //           id: uuidV4(),
  //           title: post.title,
  //           markdown: post.body,
  //           tagIds: randomTags,
  //           color: randomColor,
  //         },
  //       ]);
  //     });
  //   },
  // });
  const color = [
    "#ff7f50",
    "#87cefa",
    "#da70d6",
    "#32cd32",
    "#6495ed",
    "#ff69b4",
    "#ba55d3",
    "#cd5c5c",
    "#ffa500",
    "#40e0d0",
  ];

  // function getPosts() {
  //   return axios.get(baseURL);
  // }

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
    const noteWithTags = notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });

    return splitArray(noteWithTags, activeTab);
  }, [notes, tags, activeTab]);

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <TagContext.Provider
              value={{ tags, notesWithTags, updateTag, onDeleteTag }}
            >
              <NoteList
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                allNotes={notes}
              />
            </TagContext.Provider>
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
