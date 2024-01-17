import { connectToMongo } from "./db.js";
import express, { json } from "express";
import cors from "cors";
import user_router from "./routes/user_router.js";

connectToMongo();

const app = express();
const port = 5000;
app.use(cors());
app.use(json());

app.use("/api/user", user_router);

app.use("/", (req, res) => {
  res.json({ status: 200, message: "you are connected to API server" });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
