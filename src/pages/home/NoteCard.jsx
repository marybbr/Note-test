import { Card, Stack, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export function NoteCard(note) {
  const { id, tags, color, title } = note;
  return (
    <Card
      as={Link}
      to={`${id}`}
      style={{ backgroundColor: color, border: color }}
      className="h-100 text-reset text-decoration-none"
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <h4>{title}</h4>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="align-items-center justify-content-center flex-wrap"
            >
              {note.tags.map((tag) => (
                <p className="h6" key={tag.id}>
                  <Badge>{tag.label}</Badge>
                </p>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}
