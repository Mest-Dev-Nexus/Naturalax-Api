import express from "express";
import "dotenv/config";
import productRouter from "./routes/products.js";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/users.js";



// dotenv.config()

// create Db connection
const connectionString = process.env.MONGO_URI;
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Database fully connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Create an express app
const app = express();

// Use global middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Naturalux API" });
});
// Use routes
app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);

// listen for incoming request
const port = process.env.PORT || 6190;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});