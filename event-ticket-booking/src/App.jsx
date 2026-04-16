import React, { useState, useEffect } from 'react';
import EventDetails from './components/EventDetails';
import BookingForm from './components/BookingForm';
import BookingSummary from './components/BookingSummary';
import AdminDashboard from './components/AdminDashboard';
import './index.css';

const App = () => {
  const INITIAL_TICKETS = 50;
  
  const [event, setEvent] = useState({
    name: 'TechNova 2024: The AI Frontier',
    department: 'Computer Science',
    date: 'April 25, 2024',
    time: '10:00 AM - 4:00 PM',
    venue: 'Grand Seminar Hall, Block C',
    price: 499,
    availableTickets: INITIAL_TICKETS
  });

  const [bookings, setBookings] = useState([]);
  const [lastBooking, setLastBooking] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('event_bookings');
    if (savedBookings) {
      const parsed = JSON.parse(savedBookings);
      setBookings(parsed);
      
      // Sync remaining tickets
      const sold = parsed.reduce((sum, b) => sum + b.tickets, 0);
      setEvent(prev => ({ ...prev, availableTickets: INITIAL_TICKETS - sold }));
    }
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('event_bookings', JSON.stringify(bookings));
    
    // Sync tickets count
    const sold = bookings.reduce((sum, b) => sum + b.tickets, 0);
    setEvent(prev => ({ ...prev, availableTickets: INITIAL_TICKETS - sold }));
  }, [bookings]);

  const handleBooking = (data) => {
    const updatedBookings = [...bookings, data];
    setBookings(updatedBookings);
    setLastBooking(data);
    setIsBooked(true);
  };

  const handleReset = () => {
    setIsBooked(false);
    setLastBooking(null);
  };

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginBottom: '1rem' }}>
        <button 
          onClick={() => setIsAdmin(!isAdmin)} 
          className="btn-reset" 
          style={{ fontSize: '0.75rem', padding: '0.5rem 1rem', marginTop: 0 }}
        >
          {isAdmin ? 'Switch to Booking' : 'Admin Login'}
        </button>
      </div>

      <div className="glass-card">
        {isAdmin ? (
          <AdminDashboard 
            bookings={bookings} 
            event={event} 
            onBack={() => setIsAdmin(false)} 
          />
        ) : (
          <>
            {!isBooked ? (
              <div className="grid-layout">
                <EventDetails event={event} />
                <BookingForm 
                  onBook={handleBooking} 
                  availableTickets={event.availableTickets} 
                />
              </div>
            ) : (
              <BookingSummary 
                booking={lastBooking} 
                event={event} 
                onReset={handleReset} 
              />
            )}
          </>
        )}
      </div>
      
      {/* Small credit or info footer */}
      <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        Internal Event Management System &copy; 2024
      </p>
    </div>
  );
};

export default App;
