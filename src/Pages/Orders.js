import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import DeleteOrder from "../components/models/Order/DeleteOrder";

const Orders = () => {
  const [refresh, setRefresh] = useState(false);
  const [showDOM, setShowDOM] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [previousName, setPreviousName] = useState("");
  const[user,setuser]=useState([]);
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3001/orders");
      setOrders(response?.data);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };
  const fetchname = async () =>{
     try{
         const respons = await axios.get("http://localhost:3001/show");
         setuser(respons?.data);
     }
     catch(error){
      console.error("Failed to fetch users:", error);

     }


  }
  useEffect(() => {
    fetchOrders();
    fetchname();
  }, [refresh]);
  return (
    <div>
      <DeleteOrder 
      show={showDOM}
      setShow={setShowDOM}
      refresh={refresh}
      setRefresh={setRefresh}
      previousName={previousName}
      orderId={orderId}
      />
      <div className="contact-list">
        <div className=" m-3">
          <h3>Order List</h3>
        </div>
        <table border="2">
          <thead>
            <tr>
              <th>image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={`data:image/png;base64,${order.image}`}
                    alt="Club"
                    width={200}
                  />
                </td>
                <td>{order?.productName}</td>
                <td>{order?.price}</td>
                <td>{order?.quantity}</td>
                <td>{order?.total}</td>
                <td>{order?.location}</td>
                <td>
                  <span className="mx-3">
                    <BiTrash
                      size={30}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setPreviousName(order?.productName);
                        setOrderId(orders[index]?._id);
                        setShowDOM(true);
                      }}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
