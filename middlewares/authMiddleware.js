const jwt = require("jsonwebtoken");

const authMiddleware = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers.authorization;
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  } else {
    return response.status(401).json({
      error: "Unauthorized access",
      message: "Missing authentication header",
    });
  }
  if (jwtToken === undefined) {
    return response.status(401).json({
      error: "Unauthorized access",
      message: "Missing authentication token",
    });
  } else {
    jwt.verify(jwtToken, process.env.JWT_SECRET, async (error, payload) => {
      if (error) {
        return response.status(401).json({
          error: "Unauthorized access",
          message: "Invalid Jwt Token",
        });
      } else {
        const { user } = payload;
        request.user = user;
        next();
      }
    });
  }
};

module.exports = authMiddleware;
