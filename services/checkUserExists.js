const checkUserExists = async (request) => {
  const { email } = request.body;
  const query = `
    SELECT * FROM users
    WHERE email = ?;
    `;
  return await request.db.get(query, [email]);
};
module.exports = checkUserExists;
