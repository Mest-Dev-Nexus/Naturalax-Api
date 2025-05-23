import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config"

import productRouter from "./routes/product.js";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";
import orderRouter from "./routes/order.js";
import deliveryRouter from "./routes/delivery.js";
import discountRounter from "./routes/discount.js";
import passwordRouter from "./routes/passwords.js";


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

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use((req, res, next) => {
   console.log("Request Path:", req.path);
  console.log("Request Method:", req.method);
  console.log("Content-Type:", req.headers['content-type']);
  console.log("Request Body:", req.body);
  next();
});
// app.use(productRouter);
app.use(userRouter);
app.use(adminRouter);
app.use(discountRounter)
app.use(productRouter);
app.use(passwordRouter)
app.use(deliveryRouter);
app.use(orderRouter);

// listen for incoming request
const port = process.env.PORT || 7019;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is listening on port ${port}`);
});
