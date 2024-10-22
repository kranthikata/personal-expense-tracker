const retrieveATransaction = async (request) => {
  const { id } = request.params;
  const userId = request.user.id;
  const getTransactionQuery = `
  Select transactions.id, transactions.type, categories.name AS category, transactions.amount, transactions.date, transactions.description 
  FROM transactions INNER JOIN categories ON transactions.category_id = categories.id 
  WHERE transactions.id = ? AND transactions.user_id=?;
  `;
  return await request.db.get(getTransactionQuery, [id, userId]);
};
module.exports = retrieveATransaction;
