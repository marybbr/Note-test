import { useNavigate } from "react-router-dom";
import { useNote } from "../../NoteLayout";
import ReactMarkdown from "react-markdown";
import { Row, Col, Stack, Button, Badge } from "react-bootstrap";

export function Preview({ availableTags, onDeleteNote }) {
  const note = useNote();
  const navigate = useNavigate();
  const noteTags = availableTags.filter((tag) => note.tagIds.includes(tag.id));

  return (
    <div>
      <Row className="align-items-center glassy-bg p-3">
        <Col>
          <h1>{note.title}</h1>
        </Col>
        <Col>
          <Stack gap={2} direction="horizontal" className="justify-content-end">
            <Button
              onClick={() => navigate(`/${note.id}/edit`)}
              size="lg"
              variant="dark"
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                onDeleteNote(note.id);
                navigate("/");
              }}
              size="lg"
              variant="danger"
            >
              Delete
            </Button>
            <Button
              onClick={() => navigate("/")}
              size="lg"
              variant="outline-dark"
            >
              Back
            </Button>
          </Stack>
        </Col>
      </Row>
      <Row
        className="align-items-center mt-3 p-3 rounded"
        style={{ backgroundColor: note.color }}
      >
        <Col>
          <h5>Tags :</h5>
          <Stack direction="horizontal" gap={2}>
            {noteTags.map((tag) => (
              <Badge
                bg="light"
                text="dark"
                className="text-truncate"
                key={tag.id}
              >
                {tag.label}
              </Badge>
            ))}
          </Stack>
        </Col>
      </Row>
      <Row className="h-80 glassy-bg p-3 mt-4">
        <h5>
          <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </h5>
      </Row>
    </div>
  );
}
