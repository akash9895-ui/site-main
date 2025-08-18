import React, { useEffect, useState } from 'react';

function App() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/staff')
      .then(res => res.json())
      .then(setStaff)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2 style={{ color: '#4A90E2' }}>🧑‍💻 Our Team</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {staff.map(user => (
  <div
    key={user.id}
    style={{
      padding: '1rem',
      border: '1px solid #ccc',
      borderRadius: '10px',
      textAlign: 'center',
      width: '180px',
      backgroundColor: '#1a1a1a',
      color: '#ffffff'
    }}
  >
    <img
      src={user.avatar}
      alt={user.displayname}
      style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '0.5rem'
      }}
    />
    {staff.map(user => (
  <div key={user.id} style={styles.card}>
    <img src={user.avatar} alt={user.username} style={styles.avatar} />
    <p style={styles.name}>{user.displayname}</p>  {/* 👈 Shows nickname or username */}
    <p>{user.username}</p>
    <p style={styles.role}>{user.role}</p>
    <p style={styles.description}>{user.description}</p>
  </div>
))}
  </div>
))}

</div>
 </div>
  );
}

export default App;
