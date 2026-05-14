import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingCart, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../context/useCart";

const Navbar = ({ onOpenCart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const navitems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "products" },
    { name: "About", path: "about" },
  ];

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 backdrop-blur-md bg-black/80">
        <div className="mx-auto flex max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16 w-full">
            {/* Left Logo */}
            <Link to="/" className="flex gap-2 items-center">
              <div className="size-8 rounded-lg flex items-center justify-center bg-white">
                <div className="size-4 rounded-full bg-black" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Lumina
              </span>
            </Link>

            {/* Middle Nav Links */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
              {navitems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-gray-400 hover:text-white transition-colors ${isActive ? "text-white" : ""}`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={onOpenCart}
                className="relative hidden sm:block rounded-full p-2 text-gray-400 hover:bg-zinc-900 hover:text-white transition-colors"
              >
                <ShoppingCart className="size-6" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 px-1 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>

              <button
                className="md:hidden rounded-full p-2 text-gray-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -1 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -1 }}
              className="absolute top-16 left-0 w-full p-4 shadow-xl bg-black md:hidden border-b border-gray-800"
            >
              <div className="flex flex-col gap-2">
                {navitems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `font-medium flex justify-center py-2 px-4 rounded transition-colors ${
                        isActive
                          ? "bg-zinc-900 text-white"
                          : "text-gray-300 hover:bg-zinc-900 hover:text-white"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
