const { Router } = require("express");
const {
  allMessages,
  createMessage,
  updateMessage,
} = require("../controllers/message.controller");

const messageRouter = Router();
messageRouter
  .get("/", allMessages)
  .post("/", createMessage)
  .put("/", createMessage);

module.exports = { messageRouter };
