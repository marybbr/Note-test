import { Form, Modal, Row, Stack, Col } from "react-bootstrap";
import { Delete } from "@icon-park/react";

export function EditTagsModal({
  availableTags,
  show,
  onHide,
  updateTag,
  onDeleteTag,
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      scrollable
      contentClassName="modal-bg p-2"
    >
      <Modal.Header closeButton>Edit Tags</Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={1}>
            {availableTags.map((tag) => (
              <Row key={tag.id} className="align-items-center">
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={(e) => updateTag(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto" className="pointer">
                  <Delete
                    size="25"
                    onClick={() => onDeleteTag(tag.id)}
                    fill={["#cc525c"]}
                  />
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
