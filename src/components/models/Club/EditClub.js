import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EditClub({
  clubId,
  previousName,
  previousAddress,
  previousPrice,
  show,
  setShow,
  setRefresh,
  refresh,
}) {
  const handleClose = () => setShow(false);
  const [error, setError] = useState("");
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [price,setPrice] = useState(0);
  const [id, setId] = useState("");
  const handleUpdateClub = async () => {
    try {
      await axios.put(`http://localhost:3001/club/${id}`, {
        name,
        address,
        price
      });
      setShow(false)
      setRefresh(!refresh);
    } catch (err) {
      console.error("Failed to update club:", err);
      setError(err.response?.data.message);
    }
  };
  useEffect(() => {
    setAddress(previousAddress);
    setName(previousName);
    setPrice(previousPrice)
    setId(clubId);
  }, [previousName, previousAddress, previousPrice,clubId]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Club</Modal.Title>
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
        <Button className="btn btn-success" onClick={() => handleUpdateClub()}>
          Edit Club
        </Button>
      </Modal.Body>
    </Modal>
  );
}
export default EditClub;
