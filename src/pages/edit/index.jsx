import { useNote } from "../../NoteLayout";
import { NoteForm } from "../../components/NewForm";

export function EditNote({ onUpdateNote, onAddTag, availableTags }) {
  const note = useNote();
  const noteTags = availableTags.filter((tag) => note.tagIds.includes(tag.id));

  return (
    <>
      <h1>Edit Note</h1>
      <NoteForm
        onAddTag={onAddTag}
        onSubmit={(data) => onUpdateNote(note.id, data)}
        availableTags={availableTags}
        title={note.title}
        markdown={note.markdown}
        tags={noteTags}
        defaultColor={note.color}
      />
    </>
  );
}
