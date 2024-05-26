import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { BiPlus } from "react-icons/bi";

function SlotList({ selectedSlots, setSelectedSlots }) {
  const [slots, setSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0); // Index of selected day
  const today = new Date();
  const dates = [];
  for (let i = 0; i < 13; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(currentDate.getDate() + i);
    const date = currentDate.getDate();
    const month = currentDate
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    dates.push(`${date} ${month}`);
  }
  const handleSlotClick = (dayIndex, slotIndex) => {
    const updatedSlots = slots.map((daySlots, dIndex) => {
      if (dIndex === dayIndex) {
        return daySlots.map((slot, sIndex) => {
          if (sIndex === slotIndex) {
            return { ...slot, selected: !slot.selected };
          } else {
            return { ...slot, selected: false };
          }
        });
      } else {
        return daySlots.map(slot => ({ ...slot, selected: false }));
      }
    });

    setSlots(updatedSlots);

    // Update selected slots
    const clickedSlot = updatedSlots[dayIndex][slotIndex];
    if (clickedSlot.selected) {
      setSelectedSlots([clickedSlot]);
    } else {
      setSelectedSlots([]);
    }
  };

  useEffect(() => {
    // Function to generate slots for a day with a one-hour gap
    const generateDaySlots = date => {
      const daySlots = [];
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0); // Set time to midnight
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999); // Set time to end of day

      let currentSlot = new Date(startOfDay);
      const currentHour = new Date().getHours();

      // Start slots from the next hour if today
      if (date.getDate() === new Date().getDate()) {
        currentSlot.setHours(currentHour + 1, 0, 0, 0); // Start from next hour
      } else {
        currentSlot.setHours(0, 0, 0, 0); // Start from midnight for other days
      }

      while (currentSlot <= endOfDay) {
        const nextHour = new Date(currentSlot);
        nextHour.setHours(nextHour.getHours() + 1); // Move to next hour

        // Format slots to display in UI
        const day = date.getDate(); // Get day of the month (1-31)
        const monthIndex = date.getMonth(); // Get month index (0-11)
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const month = months[monthIndex]; // Get month name from array

        const formattedDate = `${day} ${month}`;
        console.log(formattedDate);
        const slot = {
          startTime: currentSlot.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          endTime: nextHour.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          date: formattedDate,
        };
        daySlots.push(slot);
        currentSlot = nextHour; // Move to next hour
      }
      return daySlots;
    };

    // Generate slots for the next 14 days
    const today = new Date();
    const days = [...Array(13)].map((_, index) => {
      const currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() + index);
      return generateDaySlots(currentDate);
    });

    setSlots(days);
  }, []);

  const handleDayClick = index => {
    setSelectedDay(index);
  };
  console.log(selectedSlots);
  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex flex-wrap justify-content-center">
          {dates.map((date, index) => (
            <Button
              className="mx-2 my-2"
              key={index}
              onClick={() => handleDayClick(index)}
              variant={selectedDay === index ? "primary" : "secondary"}
            >
              {date}
            </Button>
          ))}
        </div>
      </div>
      <div className="col-12 m-4">
        {slots[selectedDay] && (
          <>
            <h3>Available Slots({slots[selectedDay]?.length})</h3>
            <ul className="list-unstyled">
              {slots[selectedDay].map((slot, index) => (
                <div
                  key={index}
                  className={`my-1 p-2 ${slot.selected ? "selected-slot" : ""}`}
                  style={{
                    border: "1px solid black",
                    cursor: "pointer",
                    background: slot.selected ? "black" : "",
                    color: slot.selected ? "white" : "",
                  }}
                  onClick={() => handleSlotClick(selectedDay, index)}
                >
                  <li className="d-flex justify-content-between align-items-center">
                    <div>
                      {slot.startTime} - {slot.endTime}
                    </div>
                    <div>
                      <BiPlus />
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default SlotList;
