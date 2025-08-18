// StaffList.js — Enhanced Version with Single-Staff Editing
import React, { useEffect, useState } from 'react';

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem'
  },
  card: {
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '10px',
    textAlign: 'center',
    backgroundColor: '#1e1e1e'
  },
  avatar: {
    width: '80px',
    borderRadius: '50%'
  },
  name: {
    fontWeight: 'bold',
    fontSize: '18px'
  },
  role: {
    fontStyle: 'italic',
    color: '#bbb'
  },
  description: {
    fontSize: '14px',
    color: '#ddd',
    marginBottom: '0.5rem'
  },
  button: {
    padding: '4px 8px',
    background: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  input: {
    width: '100%',
    padding: '6px',
    marginBottom: '0.5rem',
    borderRadius: '4px'
  }
};

export default function StaffList() {
  const [staff, setStaff] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/staff')
      .then(res => res.json())
      .then(data => setStaff(data))
      .catch(console.error);
  }, []);

  const startEditing = (user) => {
    setEditingUser(user);
    setNewDescription(user.description || '');
  };

  const saveDescription = () => {
    if (!editingUser) return;

    fetch(`http://localhost:3001/api/staff/${editingUser.user_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description: newDescription })
    })
      .then(res => res.json())
      .then(() => {
        setStaff(prev =>
          prev.map(user =>
            user.user_id === editingUser.user_id
              ? { ...user, description: newDescription }
              : user
          )
        );
        setEditingUser(null);
        setNewDescription('');
      })
      .catch(err => console.error('Failed to update:', err));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center' }}>🧑‍💻 Our Team</h2>
      <div style={styles.grid}>
        {staff.map(user => (
          <div key={user.user_id} style={styles.card}>
            <img src={user.avatar} alt={user.username} style={styles.avatar} />
            <p style={styles.name}>{user.displayname || user.username}</p>
            <p>{user.username}</p>
            <p style={styles.role}>{user.role}</p>

            {editingUser?.user_id === user.user_id ? (
              <>
                <input
                  style={styles.input}
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                />
                <button style={styles.button} onClick={saveDescription}>Save</button>
              </>
            ) : (
              <>
                <p style={styles.description}>{user.description}</p>
                <button style={styles.button} onClick={() => startEditing(user)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

