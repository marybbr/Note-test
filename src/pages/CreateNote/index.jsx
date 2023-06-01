import { useRef, useState } from "react";
import { SliderPicker } from "react-color";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}) {
  const titleRef = useRef();
  const markdownRef = useRef();
  const [selectedTags, setSelectedTags] = useState(tags);
  const [color, setSelectedColor] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current.value,
      markdown: markdownRef.current.value,
      tags: selectedTags,
      color: color,
    });
    navigate("..");
  }

  return (
    <Form className="mt-4" onSubmit={handleSubmit}>
      <Stack gap={3}>
        <Row className="mb-2 glassy-bg p-5">
          <Col>
            <Form.Group controlId="title">
              <Form.Label as="h4">Title</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={title} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label as="h4">Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
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
        <Row className="mb-2 glassy-bg p-5">
          <SliderPicker
            color={color}
            onChange={(color) => setSelectedColor(color.hex)}
          />
        </Row>
        <Row className="glassy-bg p-5">
          <Form.Group controlId="markdown">
            <Form.Label as="h4">Body</Form.Label>
            <Form.Control
              defaultValue={markdown}
              required
              as="textarea"
              size="lg"
              ref={markdownRef}
              rows={10}
            />
          </Form.Group>
        </Row>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button size="lg" type="submit" variant="dark">
            Save
          </Button>
          <Link to="..">
            <Button type="button" size="lg" variant="outline-dark">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}
