"use client";

import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const ReservationCalendar = ({ reservations }) => {
  const events = reservations.map((reservation) => ({
    title: reservation.title,
    start: new Date(reservation.start),
    end: new Date(reservation.end),
    allDay: reservation.allDay,
  }));

  const handleSelectEvent = (event) => {
    // Handle event selection (e.g., show details or edit)
  };

  const handleSelectSlot = (slotInfo) => {
    // Handle slot selection (e.g., create a new reservation)
  };

  return (
    <div className="h-full">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
      />
    </div>
  );
};

export default ReservationCalendar;
