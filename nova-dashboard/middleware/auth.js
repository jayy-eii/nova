import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protects a route — only lets the request through if it has a valid login token.
export async function protect(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Not authorized, no token provided" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Not authorized, user no longer exists" });
    }
    req.user = user; // attach the logged-in user to the request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Not authorized, invalid or expired token" });
  }
}

