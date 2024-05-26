import axios from "axios";
import { useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AddClub({ show, setShow, setRefresh, refresh }) {
  const handleClose = () => setShow(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [price,setPrice] = useState(0);
  const [image, setImage] = useState(null);
  function handleAddClub() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("price",price)
    formData.append("image", image);

    axios
      .post("http://localhost:3001/clubs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        setName("");
        setAddress("");
        setImage(null);
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
        <Modal.Title>Add Club</Modal.Title>
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
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextAddress">
          <Form.Label column sm="2">
            Price
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="number"
              value={price}
              name={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextAddress">
          <Form.Label column sm="2">
            Image
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Col>
        </Form.Group>
        <Button className="btn btn-success" onClick={() => handleAddClub()}>
          Add Club
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default AddClub;
