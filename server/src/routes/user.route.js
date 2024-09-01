const { Router } = require("express");
const {
  getMe,
  updateMe,
  deleteMe,
  allUsers,
} = require("../controllers/user.controller");
const userRouter = Router();
userRouter
  .get("/", allUsers)
  .get("/me", getMe)
  .put("/", updateMe)
  .delete("/", deleteMe);
module.exports = { userRouter };
