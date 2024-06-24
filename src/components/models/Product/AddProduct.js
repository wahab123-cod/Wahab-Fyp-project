import axios from "axios";
import { useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AddProduct({ show, setShow, setRefresh, refresh }) {
  const handleClose = () => setShow(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [buyer, setBuyer] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  function handleAddProduct() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("buyer", buyer);
    formData.append("location", location);
    formData.append("image", image);
    

    axios
      .post("http://localhost:3001/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        setName("");
        setPrice(0);
        setBuyer("");
        setLocation("");
        setImage(null);
        setShow(false);
        setRefresh(!refresh);
        alert("Your product was added successfully");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response?.data.message || "An error occurred");
      });
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
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
              required
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
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextBuyer">
          <Form.Label column sm="2">
            Seller Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Seller"
              value={buyer}
              onChange={(e) => setBuyer(e.target.value)}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextLocation">
          <Form.Label column sm="2">
            Stock
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="Number"
              placeholder="Stock"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
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
        <Button className="btn btn-success" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default AddProduct;
