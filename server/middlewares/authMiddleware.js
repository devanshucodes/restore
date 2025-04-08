const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Check if authorization header exists
    const authHeader = req.header("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Authorization failed, no token provided",
      });
    }

    // Extract token from header
    const token = authHeader.split(" ")[1];

    // Verify token
    const decryptedToken = jwt.verify(token, process.env.jwt_secret);
    req.body.userId = decryptedToken.userId; // Add userId to request

    // Continue to the next middleware
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({
        success: false,
        message: "Token expired, please log in again",
      });
    }
    // Generic error message
    return res.status(401).send({
      success: false,
      message: "Invalid token",
    });
  }
};
