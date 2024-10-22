const deleteTransaction = async (request) => {
  const { id } = request.params;
  const userId = request.user.id;
  const deleteQuery = `
    DELETE FROM transactions WHERE id=? AND user_id = ?;
    `;

  return await request.db.run(deleteQuery, [id, userId]);
};

module.exports = deleteTransaction;
