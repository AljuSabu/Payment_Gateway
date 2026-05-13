import { motion } from "framer-motion";
import { Home, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center -mt-15 bg-white px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 rounded-full bg-red-100 p-6"
        >
          <AlertCircle className="size-12 text-red-600" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-4"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10 max-w-md text-lg text-gray-400"
        >
          We couldn't find the page you were looking for. It might have been
          moved or doesn't exist.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate("/")}
          className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-gray-800 "
        >
          <Home className="mr-2 size-5" />
          Back to Home
        </motion.button>
      </div>
    </>
  );
};

export default PageNotFound;
