import axios from "axios";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteProduct({
  productId,
  previousName,
  show,
  setShow,
  setRefresh,
  refresh,
}) {
  const handleClose = () => setShow(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:3001/product/${id}`);
      setShow(false);
      setRefresh(!refresh);
    } catch (err) {
      console.error("Failed to delete product:", err);
      setError(err.response?.data.message || "Failed to delete product");
    }
  };

  useEffect(() => {
    setName(previousName);
    setId(productId);
  }, [previousName, productId]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Product</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error !== "" && (
          <Alert
            variant="danger"
            onClose={() => {
              setError("");
              setShow(false);
            }}
            dismissible
          >
            <Alert.Heading>{error}</Alert.Heading>
          </Alert>
        )}
        <p>Are you sure you want to delete {name}?</p>
        <Button className="btn btn-danger" onClick={handleDeleteProduct}>
          Delete Product
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteProduct;
