
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState('dashboard');
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    licenseNumber: '',
    status: 'Available',
  });

  async function loadDrivers() {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/drivers');

      if (!response.ok) {
        throw new Error('Could not load drivers.');
      }

      const data = await response.json();
      setDrivers(data);
    } catch (error) {
      setMessage(
        'Could not connect to the backend. Check that your backend server is running on port 5000.'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (page === 'drivers') {
      loadDrivers();
    }
  }, [page]);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/drivers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || 'Could not add driver.');
      }

      setForm({
        name: '',
        phone: '',
        email: '',
        licenseNumber: '',
        status: 'Available',
      });

      setMessage('Driver added successfully!');
      await loadDrivers();
    } catch (error) {
      setMessage(error.message || 'Something went wrong.');
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="logo">🚗 RideFlow</h2>
        <p className="menu-title">MAIN MENU</p>

        <nav>
          <button
            type="button"
            className={`nav-link ${page === 'dashboard' ? 'active' : ''}`}
            onClick={() => setPage('dashboard')}
          >
            ▦ Dashboard
          </button>

          <button
            type="button"
            className={`nav-link ${page === 'drivers' ? 'active' : ''}`}
            onClick={() => setPage('drivers')}
          >
            ♙ Drivers
          </button>

          <button type="button" className="nav-link" onClick={() => setMessage('Vehicles management is coming next.')}>
            🚘 Vehicles
          </button>
          <button type="button" className="nav-link" onClick={() => setMessage('Passenger management is coming next.')}>
            ♧ Passengers
          </button>
          <button type="button" className="nav-link" onClick={() => setMessage('Ride management is coming next.')}>
            ⇄ Rides
          </button>
          <button type="button" className="nav-link" onClick={() => setMessage('Payment management is coming next.')}>
            ₹ Payments
          </button>
          <button type="button" className="nav-link" onClick={() => setMessage('Reviews management is coming next.')}>
            ☆ Reviews
          </button>
        </nav>

        <div className="sidebar-footer">
          <span className="status-dot"></span>
          RideFlow Management
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">MANAGEMENT / {page.toUpperCase()}</p>
            <h1>{page === 'dashboard' ? 'Dashboard' : 'Driver Management'}</h1>
          </div>

          <div className="admin-profile">
            <div className="avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <p>System Manager</p>
            </div>
          </div>
        </header>

        {page === 'dashboard' ? (
          <>
            <section className="welcome">
              <div>
                <p className="welcome-label">RIDEFLOW OVERVIEW</p>
                <h2>Welcome back, Admin!</h2>
                <p>Here's what's happening with your ride operations.</p>
              </div>
              <div className="welcome-icon">🚕</div>
            </section>

            <section className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon blue">♙</div>
                <p>Total Drivers</p>
                <h2>{drivers.length}</h2>
                <span>Registered drivers (dashboard preview)</span>
              </div>

              <div className="stat-card">
                <div className="stat-icon purple">🚘</div>
                <p>Total Vehicles</p>
                <h2>—</h2>
                <span>Vehicle records not connected yet</span>
              </div>

              <div className="stat-card">
                <div className="stat-icon orange">⇄</div>
                <p>Total Rides</p>
                <h2>—</h2>
                <span>Ride records not connected yet</span>
              </div>

              <div className="stat-card">
                <div className="stat-icon green">₹</div>
                <p>Total Revenue</p>
                <h2>—</h2>
                <span>Revenue data not connected yet</span>
              </div>
            </section>

            <section className="content-grid">
              <div className="panel">
                <div className="panel-heading">
                  <div>
                    <h3>Recent Rides</h3>
                    <p>Overview of the latest ride activity</p>
                  </div>
                </div>

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>RIDE ID</th>
                        <th>PASSENGER</th>
                        <th>DESTINATION</th>
                        <th>FARE</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#RF1001</td>
                        <td>Rahul Sharma</td>
                        <td>College Road</td>
                        <td>₹250</td>
                        <td><span className="badge completed">Completed</span></td>
                      </tr>
                      <tr>
                        <td>#RF1002</td>
                        <td>Priya Patil</td>
                        <td>City Centre</td>
                        <td>₹180</td>
                        <td><span className="badge ongoing">Ongoing</span></td>
                      </tr>
                      <tr>
                        <td>#RF1003</td>
                        <td>Amit Joshi</td>
                        <td>Railway Station</td>
                        <td>₹320</td>
                        <td><span className="badge cancelled">Cancelled</span></td>
                      </tr>
                      <tr>
                        <td>#RF1004</td>
                        <td>Sneha Kulkarni</td>
                        <td>University Road</td>
                        <td>₹210</td>
                        <td><span className="badge completed">Completed</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="panel activity-panel">
                <h3>Ride Summary</h3>
                <p className="panel-subtitle">Current operational overview</p>

                <div className="summary-row">
                  <span>Completed rides</span>
                  <strong>946</strong>
                </div>
                <div className="progress-track">
                  <div className="progress-fill completed-fill"></div>
                </div>

                <div className="summary-row">
                  <span>Ongoing rides</span>
                  <strong>24</strong>
                </div>
                <div className="progress-track">
                  <div className="progress-fill ongoing-fill"></div>
                </div>

                <div className="summary-row">
                  <span>Cancelled rides</span>
                  <strong>38</strong>
                </div>
                <div className="progress-track">
                  <div className="progress-fill cancelled-fill"></div>
                </div>

                <div className="summary-note">
                  <strong>Note</strong>
                  <p>These are sample figures for the initial dashboard design.</p>
                </div>
              </div>
            </section>
          </>
        ) : page === 'drivers' ? (
          <>
            <section className="panel" style={{ marginBottom: '24px' }}>
              <h3>Add New Driver</h3>
              <p className="panel-subtitle">Register a driver in RideFlow.</p>

              <form onSubmit={handleSubmit}>
                <div className="driver-form-grid">
                  <label>
                    Driver Name *
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Full name" />
                  </label>

                  <label>
                    Phone Number *
                    <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone number" />
                  </label>

                  <label>
                    Email
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email address" />
                  </label>

                  <label>
                    License Number *
                    <input name="licenseNumber" value={form.licenseNumber} onChange={handleChange} required placeholder="Unique license number" />
                  </label>

                  <label>
                    Status
                    <select name="status" value={form.status} onChange={handleChange}>
                      <option>Available</option>
                      <option>On Ride</option>
                      <option>Unavailable</option>
                    </select>
                  </label>
                </div>

                <button type="submit" className="primary-button">+ Add Driver</button>
              </form>

              {message && <p className="driver-message">{message}</p>}
            </section>

            <section className="panel">
              <div className="panel-heading">
                <div>
                  <h3>Registered Drivers</h3>
                  <p>Driver records loaded from MongoDB through the API.</p>
                </div>
                <button type="button" className="primary-button" onClick={loadDrivers}>
                  Refresh
                </button>
              </div>

              {loading ? (
                <p>Loading drivers...</p>
              ) : (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>NAME</th>
                        <th>PHONE</th>
                        <th>EMAIL</th>
                        <th>LICENSE</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {drivers.map((driver) => (
                        <tr key={driver._id}>
                          <td>{driver.name}</td>
                          <td>{driver.phone}</td>
                          <td>{driver.email || '—'}</td>
                          <td>{driver.licenseNumber}</td>
                          <td>{driver.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {drivers.length === 0 && <p>No drivers found yet.</p>}
                </div>
              )}
              {message && <p className="driver-message">{message}</p>}
            </section>
          </>
        ) : (
          <section className="panel">
            <h3>Coming Soon</h3>
            <p>{message || 'This section will be developed next.'}</p>
          </section>
        )}

        <footer className="page-footer">
          RideFlow © 2026 · Driver & Ride Management System
        </footer>
      </main>
    </div>
  );
}

export default App;
