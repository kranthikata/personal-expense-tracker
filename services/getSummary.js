const getSummary = async (request) => {
  const { startDate, endDate, category } = request.query;

  let summaryQuery = `
    SELECT 
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS totalIncome,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS totalExpenses,
      SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) AS balance
    FROM transactions
  `;

  let params = [];

  if (startDate && endDate) {
    summaryQuery += ` WHERE date BETWEEN ? AND ?`;
    params.push(startDate, endDate);
  }

  if (category) {
    summaryQuery += params.length > 0 ? ` AND` : ` WHERE`;
    summaryQuery += ` category_id = ?`;
    params.push(category);
  }

  return await request.db.get(summaryQuery, params);
};
module.exports = getSummary;
