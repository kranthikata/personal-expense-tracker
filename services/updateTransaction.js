const updateTransaction = async (request) => {
  const { id } = request.params;
  const userId = request.user.id;
  const { type, categoryId, amount, date, description } = request.body;

  const updateQuery = `
  UPDATE transactions
  SET type = ?, category_id = ?, amount = ?, date = ?, description = ?
  WHERE id = ? AND user_id=?;
  `;

  const result = await request.db.run(updateQuery, [
    type,
    categoryId,
    amount,
    date,
    description,
    id,
    userId,
  ]);
  return result;
};

module.exports = updateTransaction;
