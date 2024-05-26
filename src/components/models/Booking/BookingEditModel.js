import axios from "axios";
import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";

const BookingEditModel = ({
  bookingId,
  setShowEBM,
  showEBM,
  setRefresh,
  refresh,
}) => {
  const [status, setStatus] = useState(""); // State to store the selected status
  const [rejectReason, setRejectReason] = useState(""); // State to store the rejection reason
  const [showRejectMessage, setShowRejectMessage] = useState(false); // State to control rejection reason message visibility
  const [reasonError, setReasonError] = useState(false); // State to manage reason validation error

  const handleUpdateBooking = async () => {
    try {
      // Validate if reason is provided for rejection
      if (status === "rejected" && rejectReason.trim() === "") {
        setReasonError(true);
        return;
      }

      const payload = {
        approved: status === "approved",
        rejected: status === "rejected",
        rejectReason: status === "rejected" ? rejectReason : "", // Include reject reason if status is "rejected"
      };

      await axios.put(`http://localhost:3001/bookings/${bookingId}`, payload);
      setShowEBM(false);
      setRefresh(!refresh);
      if (status === "rejected") {
        setShowRejectMessage(true); // Show rejection reason message after updating
        setRejectReason(""); // Clear reject reason input
      }
    } catch (err) {
      console.error("Failed to update booking:", err);
    }
  };

  const handleClose = () => {
    setShowEBM(false);
    setShowRejectMessage(false); // Hide rejection reason message when closing modal
    setReasonError(false); // Reset reason validation error on modal close
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value); // Update the selected status
    // Reset reason error when changing status
    if (event.target.value !== "rejected") {
      setReasonError(false);
    }
  };

  const handleRejectReasonChange = (event) => {
    setRejectReason(event.target.value); // Update the rejection reason
    // Reset reason error when typing in reason input
    if (event.target.value.trim() !== "") {
      setReasonError(false);
    }
  };

  return (
    <Modal show={showEBM} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Booking</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group>
          <Form.Check
            type="radio"
            label="Approved"
            name="status"
            value="approved"
            checked={status === "approved"}
            onChange={handleStatusChange}
          />
          <Form.Check
            type="radio"
            label="Rejected"
            name="status"
            value="rejected"
            checked={status === "rejected"}
            onChange={handleStatusChange}
          />
          {status === "rejected" && (
            <>
              <Form.Label>Select Reason for Rejection</Form.Label>
              <textarea
                className="form-control"
                value={rejectReason}
                onChange={handleRejectReasonChange}
                rows={3} // Adjust the number of rows as needed
              />
              <select>
              <option>Please choose any Reason</option>
               <option>some one already booked manually</option>
               <option>Clubs is under construction </option>
               <option>Due To raning  </option>
              </select>
              {reasonError && (
                <Alert variant="danger" className="mt-2">
                  Please provide a reason for rejection.
                </Alert>
              )}
            </>
          )}
        </Form.Group>
        <Button variant="success" onClick={handleUpdateBooking}>
          Edit Booking
        </Button>
        {status === "rejected" && (
          <Alert variant="info" className="mt-3">
            <Alert.Heading>Booking Rejected!</Alert.Heading>
            <p>{rejectReason}</p>
          </Alert>
        )}
        {status === "approved" && (
          <p>Booking Approved!</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BookingEditModel;
