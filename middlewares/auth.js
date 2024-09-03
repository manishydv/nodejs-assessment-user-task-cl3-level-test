import jwtwebtoken from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../constraints.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.status(401).json({ errMsg: "Token missing" });

    jwtwebtoken.verify(token, JWT_SECRET_KEY, (err, verified) => {
      if (err) {
        return res.status(400).json({ errMsg: "Invalid token" });
      }
    
      req.user = verified; // Attach the decoded user info to the request
      next(); // Proceed to the next middleware or route handler
    });
  } catch (err) {
    return res.status(400).json({ errMsg: "Invalid token" });
  }
};

export { auth };

