import express from "express";
import morgan from "morgan";
import paymentRouter from "./routes/paymentRoute.js";

const app = express();

//middlewaes
app.use(express.json);
app.use(morgan("dev"));

//outes
app.use("/api/v1/payment", paymentRouter);

app.get("/", (req, res) => {
  res.send("Payment Gateway");
});

export default app;
