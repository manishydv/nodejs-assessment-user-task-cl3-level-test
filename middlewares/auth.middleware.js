import jwtwebtoken from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../constraints.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.status(401).json({ errMsg: "Token Missing Access denied" });

    jwtwebtoken.verify(token, JWT_SECRET_KEY, (err, verified) => {
      if (err) return res.status(401).json({ errMsg: "Token Missing Access denied" });      
    
      req.user = verified;
      next();
    });
  } catch (err) {
    return res.status(401).json({ errMsg: "Token Missing Access denied" });
  }
};

export { auth };

