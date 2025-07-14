const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const veryfyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      return res.status(401).send({ message: "Invalid token" });
    }

    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = veryfyToken;
