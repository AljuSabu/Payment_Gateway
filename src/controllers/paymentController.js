import { instance } from "../../server.js";
import config from "../config/config.js";

export const processPayment = async (req, res) => {
  try {
    // Get the amount from the frontend
    const { amount } = req.body;

    // Create Razorpay order option
    // this object is sent directly to razorpay
    const options = {
      amount: amount * 100, // Convert rupees to paise because razorpay accepts mony only in the smallest currency units
      currency: "INR", // tell razorpay the currency type
      receipt: `receipt_${Date.now()}`, // create a unique receipt id
    };

    /*
     * Created Razorpay order
     * It sends the requests to razorpay to create an order
     * Razorpay responses with an arderId, amount, currency and status
     */

    const order = await instance.orders.create(options);

    //Success Response
    res.status(200).json({
      success: true,
      message: "Payment process initialized successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//Get Key
export const getKey = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      key: config.RAZORPAY_API_KEY,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to get Razorpay Key",
      error,
    });
  }
};
