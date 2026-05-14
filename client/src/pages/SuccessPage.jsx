import { motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/useCart";
import { ArrowRight, CheckCircle2, Download } from "lucide-react";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState(null);

  const { clearCart } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    // Get encoded data from URL query parameters
    const data = searchParams.get("data");

    if (data) {
      // Decode and convert the data back to object
      const parsedData = {
        items: [],
        ...JSON.parse(decodeURIComponent(data)),
      };

      // Save the payment info in localStorage
      localStorage.setItem("paymentInfo", JSON.stringify(parsedData));

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPaymentInfo(parsedData);
    } else {
      const storedData = localStorage.getItem("paymentInfo");

      if (storedData) {
        setPaymentInfo(JSON.parse(storedData));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckout = () => {
    clearCart();
    localStorage.removeItem("paymentInfo");
    localStorage.removeItem("checkoutItems");
    navigate("/");
  };

  const isPaymentSuccess = paymentInfo?.status === "captured";

  if (!paymentInfo) {
    return (
      <div className="flex min-h-screen -m-8 flex-col items-center justify-center bg-white px-4 text-center">
        <p className="text-gray-500 font-bold text-3xl">No order found.</p>
        <Link to="/" className="mt-4 text-blue-600 font-medium">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
            className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm"
          >
            <CheckCircle2 className="h-10 w-10" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-4xl font-black tracking-tight text-gray-900"
          >
            Payment Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500"
          >
            Your order has been placed and is being processed.
          </motion.p>
        </div>

        <div className="grid gap-8">
          {/* ORDER STATUS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    Order ID
                  </label>

                  <p className="mt-1 font-mono text-sm font-bold text-gray-900">
                    {paymentInfo.orderId}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    Payment ID
                  </label>

                  <p className="mt-1 font-mono text-sm text-gray-600">
                    {paymentInfo.paymentId}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    Status
                  </label>

                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        isPaymentSuccess ? "bg-green-500" : "bg-red-500"
                      }`}
                    />

                    <p
                      className={`font-bold uppercase tracking-wide ${
                        isPaymentSuccess ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isPaymentSuccess ? "Paid" : "Unsuccessful"}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    Transaction Date
                  </label>

                  <p className="mt-1 text-gray-900">{paymentInfo.date}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* PAYMENT SUMMARY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm"
          >
            <h3 className="mb-6 text-2xl font-black text-gray-900">
              Payment Summary
            </h3>

            <div className="mb-8 grid grid-cols-1 gap-8 border-b border-gray-100 pb-8 sm:grid-cols-2">
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    Email Address
                  </label>

                  <p className="mt-1 text-gray-900">{paymentInfo.email}</p>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    Contact Number
                  </label>

                  <p className="mt-1 text-gray-900">{paymentInfo.contact}</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    Payment Method
                  </label>

                  <p className="mt-1 font-semibold uppercase text-gray-900">
                    {paymentInfo.method}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    Amount Paid
                  </label>

                  <p className=" text-3xl font-black text-gray-900">
                    {paymentInfo.amount.toLocaleString("en-US", {
                      style: "currency",
                      currency: paymentInfo.currency,
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* ITEMS */}
            <h3 className="mb-5 text-xl font-black text-gray-900">
              Purchased Items
            </h3>

            <div className="space-y-4">
              {paymentInfo.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all hover:border-gray-200 hover:bg-white"
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="truncate font-bold text-gray-900">
                        {item.name}
                      </h4>

                      <span className="font-bold text-gray-900">
                        {(item.price * item.quantity).toLocaleString("en-US", {
                          style: "currency",
                          currency: paymentInfo.currency,
                        })}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button className="inline-flex flex-1 items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-900 transition-all hover:bg-gray-100">
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </button>

              <button
                onClick={() => {
                  handleCheckout();
                }}
                className="inline-flex flex-1 items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-bold text-white transition-all hover:bg-gray-800"
              >
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
