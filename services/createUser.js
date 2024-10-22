const { v4 } = require("uuid");

const createUser = async (request, password) => {
  const { username, email } = request.body;
  const id = v4();
  const createQuery = `
  INSERT INTO users (id, username, password, email)
  VALUES (?,?,?,?);
  `;
  return await request.db.run(createQuery, [id, username, password, email]);
};
module.exports = createUser;
