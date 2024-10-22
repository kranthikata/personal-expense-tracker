const { v4 } = require("uuid");

const createTrasaction = async (request) => {
  const { type, categoryId, amount, date, description } = request.body;
  const id = v4();
  const userId = request.user.id;
  const createQuery = `
  INSERT INTO transactions(id, user_id, type, category_id, amount, date, description)
    VALUES (?,?,?,?,?,?,?);
    `;

  await request.db.run(createQuery, [
    id,
    userId,
    type,
    categoryId,
    amount,
    date,
    description,
  ]);
};

module.exports = createTrasaction;
