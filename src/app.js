import express from "express";
import morgan from "morgan";
import cors from "cors"
import paymentRouter from "./routes/paymentRoute.js";

const app = express();

//middlewaes
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())
app.use(express.urlencoded({extended:true})) // to make the data accessable from the body

//Routes
app.use("/api/v1/payment", paymentRouter);

app.get("/", (req, res) => {
  res.send("Payment Gateway");
});

export default app;
