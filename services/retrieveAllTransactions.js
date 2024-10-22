const retrieveAllTransactions = async (request) => {
  const userId = request.user.id;
  const getTransactionsQuery =
    "Select transactions.id, transactions.type, categories.name AS category, transactions.amount, transactions.date, transactions.description From transactions INNER JOIN categories ON transactions.category_id = categories.id WHERE transactions.user_id=?;";
  return await request.db.all(getTransactionsQuery, [userId]);
};
module.exports = retrieveAllTransactions;
