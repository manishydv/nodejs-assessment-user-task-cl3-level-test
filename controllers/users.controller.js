import jwtwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import con from "../database.js";
import { JWT_SECRET_KEY } from "../constraints.js";

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) return res.status(400).json({ errMsg: "email or password missing" });

    con.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
      if (err) return res.status(500).json({ errMsg: err.message });
      if (user) return res.status(401).json({ errMsg: "Email already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      con.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword], (err) => {
          if (err) return res.status(400).json({ errMsg: err.message });
          return res.status(201).json({ msg: "User created Successfully" });
        }
      );
    });
  } catch (err) {
    return res.status(500).json({ errMsg: "Server Error." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) return res.status(400).json({ errMsg: "email or password missing" });

    con.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
      if (err) return res.status(500).json({ errMsg: err.message });
      if (!user) return res.status(400).json({ errMsg: "incorrect email or password" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ errMsg: "incorrect email or password" });

      const token = jwtwebtoken.sign({ id: user.id, email: user.email }, JWT_SECRET_KEY, { expiresIn: "1h" });

      return res.status(200).json({ msg: "Success", token: token });
    });
  } catch (err) {
    return res.status(500).json({ errMsg: "Server Error." });
  }
};

export { register, login };
