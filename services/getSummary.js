const getSummary = async (request) => {
  const { startDate, endDate, category } = request.query;
  const userId = request.user.id;

  let summaryQuery = `
    SELECT 
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS totalIncome,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS totalExpenses,
      SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) AS balance
    FROM transactions 
    WHERE user_id = ?
  `;

  let params = [userId];

  if (startDate && endDate) {
    summaryQuery += ` AND date BETWEEN ? AND ?`;
    params.push(startDate, endDate);
  }

  if (category) {
    summaryQuery += ` AND category_id = ?`;
    params.push(category);
  }

  return await request.db.get(summaryQuery, params);
};

module.exports = getSummary;
