import ProductCard from "../card/ProductCard";
import { products } from "../data/products";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";

const Products = () => {
  const { onOpenCart } = useOutletContext();
  return (
    <>
      <div className="relative isolate min-h-screen overflow-hidden bg-white text-gray-900">
        {/* BACKGROUND EFFECTS */}
        {/* TOP RIGHT GLOW */}
        <div className="absolute -top-56 -right-32 h-152 w-152 rounded-full bg-blue-500/45 blur-[140px]" />
        <div className="absolute -top-20 right-20 h-96 w-[24rem] rounded-full bg-cyan-400/30 blur-[120px]" />

        {/* BOTTOM LEFT GLOW */}
        <div className="absolute -bottom-56 -left-32 h-152 w-152 rounded-full bg-purple-500/45 blur-[140px]" />
        <div className="absolute bottom-10 left-10 h-96 w-[24rem] rounded-full bg-fuchsia-400/25 blur-[120px]" />

        {/* CONTENT */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600"
              >
                Premium Collection
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-5xl font-black tracking-tight sm:text-6xl"
              >
                Explore Products
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 max-w-2xl text-lg text-gray-600"
              >
                Discover high-quality products designed with performance,
                elegance, and modern aesthetics in mind.
              </motion.p>
            </div>

            {/* SEARCH + FILTERS */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="text"
                placeholder="Search products..."
                className="rounded-2xl border border-gray-200 bg-white px-5 py-3 text-gray-900 placeholder:text-gray-400 outline-none shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <select className="rounded-2xl border border-gray-200 bg-white px-5 py-3 text-gray-900 outline-none shadow-sm">
                <option className="bg-white">All Categories</option>
                <option className="bg-white">Headphones</option>
                <option className="bg-white">Keyboards</option>
                <option className="bg-white">Accessories</option>
              </select>
            </div>
          </div>

          {/* PRODUCTS GRID */}
          <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* PRODUCT CARD HERE */}
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
    </>
  );
};

export default Products;
