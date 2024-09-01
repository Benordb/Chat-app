const { eq } = require("drizzle-orm");
const { db } = require("../database");
const { users, messages } = require("../database/schema");

const getMe = async (req, res) => {
  const { id } = req.user;
  try {
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        avatar_img: users.avatar_img,
        active_status: users.active_status,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, id));
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const allUsers = async (_, res) => {
  try {
    const allUsers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        avatar_img: users.avatar_img,
        active_status: users.active_status,
        updatedAt: users.updatedAt,
      })
      .from(users);
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateMe = async (req, res) => {
  const { name, email, password, avatar_img, active_status } = req.body;
  const { id } = req.user;

  try {
    const [user] = await db
      .update(users)
      .set({
        name,
        email,
        password,
        avatar_img,
        active_status,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteMe = async (req, res) => {
  const { id } = req.user;

  try {
    await db.delete(users).where(eq(users.id, id));

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { getMe, allUsers, updateMe, deleteMe };
