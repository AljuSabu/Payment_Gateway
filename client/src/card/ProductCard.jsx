import axios from "axios";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const checkOut = async (amount) => {
    try {
      const { data: orderData } = await axios.post(
        "http://localhost:5000/api/v1/payment/process-payment",
        { amount },
      );
      const { order } = orderData;
      // console.log(order);

      const { data: keyData } = await axios.get(
        "http://localhost:5000/api/v1/payment/getkey",
      );
      const { key } = keyData;
      // console.log("key:",key);

      // Open Razorpay Checkout
      const options = {
        key, // Replace with your Razorpay key_id
        amount: "50000", // Amount is in currency subunits.
        currency: "INR",
        name: "Alju Sabu",
        description: "Test Transaction",
        order_id: order.id, // This is the order_id created in the backend, Get order id from order
        callback_url: "http://localhost:5000/api/v1/payment/paymentVerification", // Your success URL / callback url we have to create from backend
        prefill: { // give user details
          name: "AljuSabu",
          email: "alju.123@example.com",
          contact: "12345678",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options); // creating razorpay instance
      rzp.open();

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group relative flex flex-col rounded-2xl border  p-4 transition-all hover:shadow-xl border-gray-800 bg-gray-900/50"
      >
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-800">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 right-3 rounded-full px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm bg-black/50">
            {product.category}
          </div>
        </div>

        <div className="mt-4 flex flex-1 flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">{product.name}</h3>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300/80 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-auto pt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-white">
              ${product.price}
            </span>
            <button
              onClick={() => {
                checkOut(product.price);
              }}
              className="inline-flex px-3 py-2 items-center justify-center rounded-lg bg-black text-white transition-all hover:bg-gray-800 hover:scale-105 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-gray-100"
            >
              Pay Rs. {product.price}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductCard;
