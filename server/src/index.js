require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { authRouter } = require("./routes/auth.route");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
