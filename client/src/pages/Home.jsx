import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../card/ProductCard";
import { ArrowRight, Sparkles } from "lucide-react";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { onOpenCart } = useOutletContext();

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[#f8fafc]">
        {/* Main Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.28),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.28),transparent_30%)]" />

        {/* Premium Mesh Gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,#ffffff,#eef4ff,#f3e8ff)]" />

        {/* Blue Orb */}
        <div className="absolute -top-40 -right-20 h-128 w-lg rounded-full bg-blue-500/35 blur-3xl animate-float" />

        {/* Purple Orb */}
        <div className="absolute -bottom-40 -left-20 h-128 w-lg rounded-full bg-purple-500/35 blur-3xl animate-float" />

        {/* Cyan Glow */}
        <div className="absolute left-1/2 top-1/3 h-96 w-[24rem] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />

        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-transparent py-20 lg:py-26">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative z-10 flex flex-col items-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-sm font-medium bg-gray-900/50 text-gray-100 mb-8"
                >
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <span>Introducing latest Tech Collection</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="max-w-3xl text-5xl font-black tracking-tight text-gray-900 sm:text-7xl leading-tight mb-6"
                >
                  Simple Online Store <br />
                  <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Reimagined.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="max-w-2xl text-lg text-gray-500 mb-10"
                >
                  Discover a curated collection of premium tech accessories
                  designed to elevate your daily workflow. Built for
                  performance, styled for you.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex w-full max-w-md flex-col sm:flex-row gap-4"
                >
                  <Link
                    to="products"
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-black px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-gray-300"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 size-5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>
          {/* Product Section */}
          <section
            id="products"
            className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
          >
            <div className="mb-12 text-center md:text-left">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm font-semibold uppercase tracking-widest text-blue-400"
              >
                Featured Collection
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-2 text-5xl font-extrabold text-gray-900"
              >
                The Future of Tech
              </motion.h2>
            </div>

            <div className="grid justify-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenCart={onOpenCart}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
