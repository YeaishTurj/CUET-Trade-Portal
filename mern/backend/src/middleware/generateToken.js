const jwt = require("jsonwebtoken");
const User = require("../users/user.model");
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const generateToken = async (userId) => {
  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET_KEY not configured in environment variables");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw new Error("Token generation failed: " + error.message);
  }
};

module.exports = generateToken;
