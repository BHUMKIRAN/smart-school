import jwt from "jsonwebtoken"

// Middleware to protect routes
const protect = (req, res, next) => {
  let token;

  // Check if Authorization header exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extract token from "Bearer token_here"
    token = req.headers.authorization.split(" ")[1];

    try {
      // Verify token using JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to request
      req.user = decoded;

      next(); // Continue to next middleware or route

    } catch (error) {
      return res.status(401).json({
        message: "Token invalid ",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "No token provided ",
    });
  }
};

export default protect;
