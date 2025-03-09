const dbPool = require("../config/database.js");

// Get All Users
const getCallUsers = () => {
  const SQLQuery = "SELECT * FROM users";
  return dbPool.execute(SQLQuery);
};

// Create New User
const createNewUsers = (body) => {
  const SQLQuery = `INSERT INTO users (username, email, password) 
                      VALUES (?, ?, ?)`;
  return dbPool.execute(SQLQuery, [body.username, body.email, body.password]);
};

// Update User
const updateUserById = (id, body) => {
  let SQLQuery = "UPDATE users SET ";
  const fields = [];

  // Cek field mana yang dikirim dalam req.body
  if (body.username) fields.push(`username = '${body.username}'`);
  if (body.email) fields.push(`email = '${body.email}'`);
  if (body.password) fields.push(`password = '${body.password}'`);

  // Jika tidak ada field yang diubah, hentikan query
  if (fields.length === 0) {
    throw new Error("Tidak ada data yang diupdate");
  }

  SQLQuery += fields.join(", ") + ` WHERE id = '${id}'`;

  return dbPool.execute(SQLQuery);
};

module.exports = {
  updateUserById,
};


// Delete User
const deleteUsers = (id) => {
  const SQLQuery = "DELETE FROM users WHERE id = ?";
  return dbPool.execute(SQLQuery, [id]);
};

module.exports = {
  getCallUsers,
  createNewUsers,
  updateUserById,
  deleteUsers,
};
