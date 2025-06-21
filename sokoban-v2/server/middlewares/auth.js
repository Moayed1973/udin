const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

const admin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ error: "Admin access required." });
  }
  next();
};

module.exports = { auth, admin };
