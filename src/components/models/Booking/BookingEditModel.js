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
  const [selectedReason, setSelectedReason] = useState(""); // State to manage selected rejection reason from dropdown

  const handleUpdateBooking = async () => {
    try {
      // Validate if reason is provided for rejection
      if (status === "rejected" && (rejectReason.trim() === "" && selectedReason === "Other" || selectedReason === "")) {
        setReasonError(true);
        return;
      }

      const payload = {
        approved: status === "approved",
        rejected: status === "rejected",
        rejectReason: status === "rejected" ? (selectedReason === "Other" ? rejectReason : selectedReason) : "", // Include reject reason if status is "rejected"
      };

      await axios.put(`http://localhost:3001/bookings/${bookingId}`, payload);
      setShowEBM(false);
      setRefresh(!refresh);
      if (status === "rejected") {
        setShowRejectMessage(true); // Show rejection reason message after updating
        setRejectReason(""); // Clear reject reason input
        setSelectedReason(""); // Clear selected reason input
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
      setSelectedReason("");
      setRejectReason("");
    }
  };

  const handleRejectReasonChange = (event) => {
    setRejectReason(event.target.value); // Update the rejection reason
    // Reset reason error when typing in reason input
    if (event.target.value.trim() !== "") {
      setReasonError(false);
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedReason(event.target.value); // Update the selected reason from dropdown
    // Reset reason error when selecting from dropdown
    if (event.target.value !== "Other") {
      setReasonError(false);
      setRejectReason(""); // Clear the reject reason input if not "Other"
    } else if (event.target.value === "Other") {
      setRejectReason(""); // Ensure reject reason input is ready for new text if "Other" is selected
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
              <select className="form-control" onChange={handleDropdownChange} value={selectedReason}>
                <option value="">Please choose a reason</option>
                <option value="someoneBooked">Someone already booked manually</option>
                <option value="underConstruction">Club is under construction</option>
                <option value="Other">Other</option>
              </select>
              {selectedReason === "Other" && (
                <>
                  <Form.Label>Specify Other Reason</Form.Label>
                  <textarea
                    className="form-control"
                    value={rejectReason}
                    onChange={handleRejectReasonChange}
                    rows={3} // Adjust the number of rows as needed
                  />
                </>
              )}
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
        {showRejectMessage && status === "rejected" && (
          <Alert variant="info" className="mt-3">
            <Alert.Heading>Booking Rejected!</Alert.Heading>
            <p>{selectedReason === "Other" ? rejectReason : selectedReason}</p>
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
