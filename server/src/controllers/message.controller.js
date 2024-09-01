const { eq, or } = require("drizzle-orm");
const { db } = require("../database");
const { messages } = require("../database/schema");

const allMessages = async (req, res) => {
  const { id } = req.user;
  try {
    const allMessages = await db.query.messages.findMany({
      where: or(eq(messages.toUId, id), eq(messages.fromUId, id)),
    });
    res.json(allMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const createMessage = async (req, res) => {
  const { toId, content } = req.body;
  const { id } = req.user;
  try {
    const [message] = await db
      .insert(messages)
      .values({
        fromUId: id,
        toUId: toId,
        message: content,
        createdAt: new Date(),
      })
      .returning();
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateMessage = async (req, res) => {
  const { id, content } = req.body;
  try {
    const [message] = await db
      .update(messages)
      .set({ content, updatedAt: new Date() })
      .where({ id })
      .returning();
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { allMessages, createMessage, updateMessage };
