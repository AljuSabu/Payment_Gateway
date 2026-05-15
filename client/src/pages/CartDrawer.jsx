import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/useCart";
import axios from "axios";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  const checkOut = async (amount) => {
    try {
      const { data: orderData } = await axios.post(
        "http://localhost:5000/api/v1/payment/process-payment",
        { amount, items: cart },
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
        amount: order.amount, // Amount is in currency subunits.
        currency: "INR",
        name: "Alju Sabu",
        description: "Test Transaction",
        order_id: order.id, // This is the order_id created in the backend, Get order id from order
        callback_url:
          "http://localhost:5000/api/v1/payment/paymentVerification", // Your success URL / callback url we have to create from backend
        prefill: {
          // give user details
          name: "AljuSabu",
          email: "alju.123@example.com",
          contact: "8129938843",
        },
        theme: {
          color: "#F37254",
        },
      };

      // Save cart items to localStorage before redirecting to Razorpay (for use in SuccessPage)
      localStorage.setItem("checkoutItems", JSON.stringify(cart));

      const rzp = new window.Razorpay(options); // creating razorpay instance
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  // Handle checkout button click
  const handleCheckout = () => {
    checkOut(cartTotal);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
            className="fixed right-0 top-0 z-60 h-full w-full max-w-md bg-white shadow-2xl"
          >
            <div className="flex h-full flex-col">
              {/* HEADER */}
              <div className="flex items-center justify-between border-b p-6">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6" />

                  <h2 className="text-xl font-bold">Your Cart</h2>
                </div>

                <button
                  onClick={onClose}
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* CART ITEMS */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <ShoppingBag className="mb-4 h-12 w-12 text-gray-300" />

                    <p className="text-lg font-medium">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-24 w-24 rounded-xl object-cover"
                        />

                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <h3 className="font-bold">{item.name}</h3>

                            <span className="font-bold">₹ {item.price}</span>
                          </div>

                          <div className="mt-auto flex items-center justify-between">
                            {/* QUANTITY */}
                            <div className="flex items-center gap-3 rounded-lg border p-1">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, "decrease")
                                }
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </button>

                              <span>{item.quantity}</span>

                              <button
                                onClick={() =>
                                  updateQuantity(item.id, "increase")
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            {/* REMOVE */}
                            <button onClick={() => removeFromCart(item.id)}>
                              <Trash2 className="h-5 w-5 text-red-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* FOOTER */}
              {cart.length > 0 && (
                <div className="border-t p-6">
                  <div className="mb-1 flex justify-between text-lg font-bold">
                    <span>Subtotal</span>

                    <span>₹ {cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="mb-5 flex justify-between text-gray-500 font-bold">
                    <span>Shipping</span>

                    <span className="text-green-500">free</span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full rounded-2xl bg-black hover:bg-gray-800 py-4 text-lg font-bold text-white"
                  >
                    Checkout Now
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
