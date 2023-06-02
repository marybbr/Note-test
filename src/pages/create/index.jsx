import { NoteForm } from "../../components/NewForm";

export function CreateNote({ onSubmit, onAddTag, availableTags }) {
  return (
    <>
      <h1>New Note</h1>
      <NoteForm
        onAddTag={onAddTag}
        onSubmit={onSubmit}
        availableTags={availableTags}
      />
    </>
  );
}
