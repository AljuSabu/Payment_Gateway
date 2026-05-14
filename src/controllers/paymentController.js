import { instance } from "../../server.js";
import config from "../config/config.js";
import crypto from "crypto";

//Payment processing
export const processPayment = async (req, res) => {
  try {
    // Get the amount from the frontend
    const { amount, items } = req.body;

    // Create Razorpay order option
    // this object is sent directly to razorpay
    const options = {
      amount: amount * 100, // Convert rupees to paise because razorpay accepts mony only in the smallest currency units
      currency: "INR", // tell razorpay the currency type
      receipt: `receipt_${Date.now()}`, // create a unique receipt id
      notes: {
        items: JSON.stringify(items), // Pass the cart items as a note to Razorpay (optional, but can be useful for record-keeping)
      },
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
      order,
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
      key: config.RAZORPAY_KEY_ID,
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

//Payment Verification
export const paymentVerification = async (req, res) => {
  // console.log(req.body);
  try {
    //Destructure payment details from req.body
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    //*Create a verification string
    //This exact format must be matching Razorpay's documentation
    //Even one character mismatch will lead to verification fail
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    //Generate expected signature using razorpay secret key
    const expectedSignature = crypto
      .createHmac("sha256", config.RAZORPAY_KEY_SECRET)
      .update(body.toString()) //Update the above body variable and convert into stiring
      .digest("hex"); //Watereverr value we get , Convert it into hexadecimal

    // console.log("Razopay signaturre :",razorpay_signature);
    // console.log("Expected Signature :", expectedSignature);

    // If the expected signature matches the signature sent by Razorpay, then the payment is verified
    if (expectedSignature === razorpay_signature) {
      // Fetch the payment details from Razorpay using the payment id
      const payment = await instance.payments.fetch(razorpay_payment_id);

      // Fetch the order details from Razorpay using the order id to get the items from the notes
      const orderDetails = await instance.orders.fetch(razorpay_order_id);

      // Prepare the payment data to be sent to the frontend
      const items = JSON.parse(orderDetails.notes.items || "[]"); // Parse the items from the notes

      const paymentData = {
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        amount: payment.amount / 100, // Convert back to rupees
        currency: payment.currency,
        method: payment.method,
        email: payment.email,
        contact: payment.contact,
        status: payment.status,
        items, // Include the cart items in the payment data
        date: new Date().toLocaleString(), // Add transaction date
      };

      // Convert object to query string and encode it to be safely included in the URL
      const encodedPaymentData = encodeURIComponent(
        JSON.stringify(paymentData),
      );

      // Redirect to the frontend success page with payment data as a query parameter
      return res.redirect(
        `http://localhost:5173/payment/paymentSuccess?data=${encodedPaymentData}`,
      );
    } else {
      //Payment Verification Failed
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Payment Verification failed",
      error,
    });
  }
};
