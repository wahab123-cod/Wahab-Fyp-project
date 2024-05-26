import axios from "axios";
import { useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AddEvent({ show, setShow, setRefresh, refresh }) {
  const handleClose = () => setShow(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [dateTime, setDateTime] = useState('');
  function handleAddEvent() {

    axios
      .post("http://localhost:3001/events", { name, dateTime, location:address },
      )
      .then((response) => {
        console.log(response);
        setName("");
        setAddress("");
        setRefresh(!refresh);
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response?.data.message);
      });
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Event</Modal.Title>
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
        DateTime
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
            Location
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Location"
              value={address}
              name={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button className="btn btn-success" onClick={() => handleAddEvent()}>
          Add Event
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default AddEvent;
