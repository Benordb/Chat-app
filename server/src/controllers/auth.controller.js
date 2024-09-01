const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { db } = require("../database");
const { users } = require("../database/schema");
const { eq } = require("drizzle-orm");
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });
    if (!user) return res.status(401).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Password is wrong" });

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET_KEY
    );

    res.json({
      message: "Successfully logged in",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_img: user.avatar_img,
        active_status: user.active_status,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const emailExistingUser = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });
    if (emailExistingUser)
      return res.status(401).json({ message: "User already exists email" });
    const nameExistingUser = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.name, name),
    });
    if (nameExistingUser)
      return res.status(401).json({ message: "User already exists name" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await db
      .insert(users)
      .values({
        name,
        password: hashedPassword,
        email,
        avatar_img: "img",
        active_status: true,
        updatedAt: new Date(),
      })
      .returning();
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET_KEY
    );
    res.json({
      message: "Successfully sign in",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_img: user.avatar_img,
        active_status: user.active_status,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { login, register };
