import React, { useState, useEffect } from "react";
import './flightCheckForm.css';

const FlightCheckForm = () => {
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    setDepartureDate('');
    setArrivalDate('');
    setDepartureAirport('');
    setArrivalAirport('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Departure Date:
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          required
        />
      </label>

      <label>
        Arrival Date:
        <input
          type="date"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
          required
        />
      </label>

      <label>
        Departure Airport:
        <input
          type="text"
          value={departureAirport}
          onChange={(e) => setDepartureAirport(e.target.value)}
          required
        />
      </label>

      <label>
        Arrival Airport:
        <input
          type="text"
          value={arrivalAirport}
          onChange={(e) => setArrivalAirport(e.target.value)}
          required
        />
      </label>

      <button type="submit">Check Flights</button>
    </form>
  );
};

export default FlightCheckForm;