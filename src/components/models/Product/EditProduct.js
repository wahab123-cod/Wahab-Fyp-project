import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EditProduct({
  productId,
  previousName,
  previousPrice,
  previousBuyer,
  previousLocation,
  previousImage,
  show,
  setShow,
  setRefresh,
  refresh,
}) {
  const handleClose = () => setShow(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [buyer, setBuyer] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("");

  const handleUpdateProduct = async () => {
    try {
      await axios.put(`http://localhost:3001/productU/${id}`, {
        name,
        price,
        buyer,
        location,
        image,
      });
      setShow(false);
      setRefresh(!refresh);
    } catch (err) {
      console.error("Failed to update product:", err);
      setError(err.response?.data.message);
    }
  };

  useEffect(() => {
    setName(previousName);
    setPrice(previousPrice);
    setBuyer(previousBuyer);
    setLocation(previousLocation);
    setImage(previousImage);
    setId(productId);
  }, [previousName, previousPrice, previousBuyer, previousLocation, previousImage, productId]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
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
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPrice">
          <Form.Label column sm="2">
            Price
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextBuyer">
          <Form.Label column sm="2">
            Buyer
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Buyer"
              value={buyer}
              onChange={(e) => setBuyer(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextLocation">
          <Form.Label column sm="2">
            Location
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextImage">
          <Form.Label column sm="2">
            Image
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Image (Base64)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button className="btn btn-success" onClick={handleUpdateProduct}>
          Edit Product
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default EditProduct;
