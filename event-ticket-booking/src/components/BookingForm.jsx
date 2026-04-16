import React, { useState } from 'react';

const BookingForm = ({ onBook, availableTickets }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    tickets: 1
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is mandatory';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email ID is mandatory';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.department) newErrors.department = 'Department is mandatory';

    if (formData.tickets < 1) {
      newErrors.tickets = 'Must be at least 1 ticket';
    } else if (formData.tickets > availableTickets) {
      newErrors.tickets = `Only ${availableTickets} tickets available`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'tickets' ? parseInt(value) || 0 : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onBook(formData);
    }
  };

  return (
    <div className="booking-form-section">
      <h2>Secure Your Spot</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@university.edu"
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="department">Your Department</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Electronics">Electronics</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Information Technology">Information Technology</option>
          </select>
          {errors.department && <span className="error-msg">{errors.department}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="tickets">Number of Tickets</label>
          <input
            type="number"
            id="tickets"
            name="tickets"
            value={formData.tickets}
            onChange={handleChange}
            min="1"
            max={availableTickets}
          />
          {errors.tickets && <span className="error-msg">{errors.tickets}</span>}
        </div>

        <button type="submit" className="btn-book" disabled={availableTickets === 0}>
          {availableTickets === 0 ? 'Sold Out' : 'Book Tickets Now'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
