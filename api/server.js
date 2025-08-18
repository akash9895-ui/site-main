const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');
const cors = require('cors');

const app = express();
const db = new Database(path.join(__dirname, '../staff.db'));

app.use(cors()); // allow frontend to access this API
app.use(express.json());

app.get('/api/staff', (req, res) => {
  const rows = db.prepare('SELECT * FROM staff').all();
  res.json(rows);
});
app.patch('/api/staff/:id', (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const stmt = db.prepare('UPDATE staff SET description = ? WHERE user_id = ?');
    stmt.run(description, id);
    res.json({ success: true });
  } catch (err) {
    console.error('Error updating description:', err);
    res.status(500).json({ error: 'Failed to update description' });
  }
});

app.patch('/api/staff/:user_id', (req, res) => {
  const { user_id } = req.params;
  const { description } = req.body;

  try {
    const stmt = db.prepare('UPDATE staff SET description = ? WHERE user_id = ?');
    stmt.run(description, id);
    res.json({ success: true });
  } catch (err) {
    console.error('Error updating description:', err);
    res.status(500).json({ error: 'Failed to update description' });
  }
});


const PORT = 3001;
app.listen(PORT, () => console.log(`🌐 API running on http://localhost:${PORT}`));