import React from 'react';

const BookingSummary = ({ booking, event, onReset }) => {
  const totalAmount = booking.tickets * event.price;

  return (
    <div className="success-card">
      <div className="success-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      <h2>Booking Confirmed!</h2>
      <p style={{ color: 'var(--text-secondary)' }}>
        Your tickets for {event.name} have been reserved successfully.
      </p>

      <div className="summary-details">
        <div className="summary-row">
          <span className="summary-label">Attendee Name</span>
          <span className="summary-value">{booking.name}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Event Name</span>
          <span className="summary-value">{event.name}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Tickets Booked</span>
          <span className="summary-value">{booking.tickets}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Price per Ticket</span>
          <span className="summary-value">₹{event.price}</span>
        </div>
        <div className="summary-row total-row">
          <span className="summary-label" style={{ color: 'white' }}>Total Amount Paid</span>
          <span className="summary-value">₹{totalAmount}</span>
        </div>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        A confirmation email has been sent to <strong>{booking.email}</strong>
      </p>

      <button onClick={onReset} className="btn-reset">
        Book More Tickets
      </button>
    </div>
  );
};

export default BookingSummary;
