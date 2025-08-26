const pool = require('../db/pool');

async function saveContact({ name, email, message }) {
  const res = await pool.query(
    'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING id',
    [name, email, message]
  );
  return res.rows[0].id;
}

async function listContacts() {
  const res = await pool.query('SELECT id, name, email, message, created_at FROM contacts ORDER BY id DESC');
  return res.rows;
}

module.exports = { saveContact, listContacts };
