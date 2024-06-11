import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

function DHA() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/infoP")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        setError(error.response?.data.message || "Failed to fetch products");
      });
  }, [refresh]);

  const handleBuyProduct = (productId) => {
    axios.post(`http://localhost:3001/product/buy/${productId}`)
      .then(response => {
        alert(response.data.message);
        setRefresh(!refresh); // Refresh the product list
      })
      .catch(error => {
        alert(error.response?.data.message || "Failed to purchase product");
      });
  };

  return (
    <div>
      <h1>Product List</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Buyer</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.buyer}</td>
              <td>{product.location}</td>
              <td>
                {!product.purchased ? (
                  <Button variant="success" onClick={() => handleBuyProduct(product._id)}>
                    Buy
                  </Button>
                ) : (
                  <span>Purchased</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DHA;
