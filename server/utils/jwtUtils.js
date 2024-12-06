import jwt from "jsonwebtoken";
import secretKey from "./jwtConfig.js";

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "1d" });
};

export default generateToken;
