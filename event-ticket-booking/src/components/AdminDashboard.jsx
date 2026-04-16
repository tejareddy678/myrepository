import React from 'react';

const AdminDashboard = ({ bookings, event, onBack }) => {
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.tickets * event.price), 0);
  const totalTicketsSold = bookings.reduce((sum, b) => sum + b.tickets, 0);

  return (
    <div className="admin-dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Admin Dashboard</h2>
        <button onClick={onBack} className="btn-reset" style={{ marginTop: 0 }}>Back to Event</button>
      </div>

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="stats-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Bookings</p>
          <p style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--accent-color)' }}>{bookings.length}</p>
        </div>
        <div className="stats-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Tickets Sold</p>
          <p style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--success-color)' }}>{totalTicketsSold}</p>
        </div>
        <div className="stats-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Revenue</p>
          <p style={{ fontSize: '1.75rem', fontWeight: '800', color: 'white' }}>₹{totalRevenue}</p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Name</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Email</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Department</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Tickets</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No bookings found.</td>
              </tr>
            ) : (
              bookings.map((booking, index) => (
                <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '1rem', fontWeight: '600' }}>{booking.name}</td>
                  <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{booking.email}</td>
                  <td style={{ padding: '1rem' }}>
                    <span className="badge" style={{ marginBottom: 0 }}>{booking.department}</span>
                  </td>
                  <td style={{ padding: '1rem' }}>{booking.tickets}</td>
                  <td style={{ padding: '1rem', fontWeight: '700' }}>₹{booking.tickets * event.price}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
