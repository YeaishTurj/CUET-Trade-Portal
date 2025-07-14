const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "user",
  },
  profileImage: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  contactNumber: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  profession: {
    type: String,
    default: "",
  },
});

// Hashing the password before saving is recommended in production
userSchema.pre("save", async function (next) {
  const user = this;

  // Only hash if password is modified or new
  if (!user.isModified("password")) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

// match password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = new model("User", userSchema);

module.exports = User;
