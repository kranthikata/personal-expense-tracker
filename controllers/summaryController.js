const getSummary = require("../services/getSummary");

const getTransactionSummary = async (request, response) => {
  try {
    const summary = await getSummary(request);
    return response.status(200).json({
      summary,
    });
  } catch (error) {
    console.error(`Failed to retrieve summary: ${error.message}`);
    return response.status(500).json({
      error: "Internal server error",
      message: "Something went wrong",
    });
  }
};

module.exports = getTransactionSummary;
