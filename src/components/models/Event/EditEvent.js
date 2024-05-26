import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EditEvent({
  eventId,
  previousEventName,
  previousLocation,
  previousEventDateTime,
  show,
  setShow,
  setRefresh,
  refresh,
}) {
  const handleClose = () => setShow(false);
  const [error, setError] = useState("");
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [dateTime, setDateTime] = useState('');
  const [id, setId] = useState("");
  console.log(eventId,'eventId')
  const handleUpdateEvent = async () => {
    try {
      await axios.put(`http://localhost:3001/event/${id}`, {
        name,
        location:address,
        dateTime
      });
      setShow(false)
      setRefresh(!refresh);
    } catch (err) {
      console.error("Failed to update event:", err);
      setError(err.response?.data.message);
    }
  };
  const formatDateTimeLocal = (isoDateTime) => {
    const date = new Date(isoDateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  useEffect(() => {
    setAddress(previousLocation);
    setName(previousEventName);
    setDateTime(formatDateTimeLocal(previousEventDateTime));
    setId(eventId);
  }, [previousEventName, previousLocation, eventId,previousEventDateTime]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Event</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error !== "" && (
          <Alert variant="danger" onClose={() => setError("")} dismissible>
            <Alert.Heading>{error}</Alert.Heading>
          </Alert>
        )}
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              name={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextDateTime">
      <Form.Label column sm="2">
        DateTime{dateTime}
      </Form.Label>
      <Col sm="10">
        <Form.Control
          type="datetime-local"
          placeholder="DateTime"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />
      </Col>
    </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextAddress">
          <Form.Label column sm="2">
            Address
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Address"
              value={address}
              name={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button className="btn btn-success" onClick={() => handleUpdateEvent()}>
          Edit Event
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default EditEvent;
