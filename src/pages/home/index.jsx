import { useMemo, useState, useContext } from "react";
import ReactSelect from "react-select";
import { Link } from "react-router-dom";
import { TagContext } from "../../App";
import { Button, Col, Form, Row, Stack, Pagination } from "react-bootstrap";
import { EditTagsModal } from "./EditTagsModal";
import { NoteCard } from "./NoteCard";

export function NoteList({ activeTab, setActiveTab, allNotes }) {
  const { tags: availableTags, notesWithTags: notes } = useContext(TagContext);

  const [selectedTags, setSelectedTags] = useState([]);
  const [title, setTitle] = useState("");
  const [modalTags, setModalTags] = useState(false);
  let items = [];
  let numberItems = 1;

  for (let number = 1; number <= allNotes.length; number += 5) {
    items.push(
      <Pagination.Item
        onClick={(e) => setActiveTab(Number(e.target.innerText))}
        key={number}
        active={numberItems === activeTab}
      >
        {numberItems}
      </Pagination.Item>
    );
    numberItems += 1;
  }

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <Row className="align-items-center mb-5 secondary-bg p-2 rounded">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="dark" size="lg">
                Create
              </Button>
            </Link>
            <Button
              size="lg"
              onClick={() => setModalTags(true)}
              variant="outline-dark"
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-5 glassy-bg p-5">
          <Col md>
            <Form.Group controlId="title">
              <Form.Label as="h4">Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group controlId="tags">
              <Form.Label as="h4">Tags</Form.Label>
              <ReactSelect
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 10 }) }}
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row lg={3} className="g-3">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard
              id={note.id}
              title={note.title}
              tags={note.tags}
              color={note.color}
            />
          </Col>
        ))}
      </Row>
      <Row className="mt-2 fixed">
        <Pagination>{items}</Pagination>
      </Row>
      <EditTagsModal
        availableTags={availableTags}
        show={modalTags}
        onHide={() => setModalTags(false)}
      />
    </>
  );
}
