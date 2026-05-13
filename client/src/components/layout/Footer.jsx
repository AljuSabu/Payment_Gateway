import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="border-t border-gray-800 bg-black">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center dark:bg-white transition-colors">
                  <div className="h-4 w-4 rounded-full bg-white dark:bg-black" />
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Lumina
                </span>
              </Link>
              <p className="max-w-xs text-gray-600 dark:text-gray-400">
                Defining the future of tech lifestyle through premium
                accessories and minimalist design.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 dark:text-white uppercase text-xs tracking-widest mb-6">
                Support
              </h4>
              <ul className="space-y-4">
                <li>
                  <div className="flex items-center cursor-pointer gap-1 text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                    Help Center <ArrowUpRight className="size-3" />
                  </div>
                </li>
                <li>
                  <div className="flex items-center cursor-pointer gap-1 text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                    Shipping & Returns <ArrowUpRight className="size-3" />
                  </div>
                </li>
                <li>
                  <div className="flex items-center cursor-pointer gap-1 text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                    Warranty <ArrowUpRight className="size-3" />
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-50 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2026 Lumina Shop. All rights reserved.
            </p>
            <div className="flex gap-8">
              <div className="text-xs cursor-pointer text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors uppercase tracking-widest">
                Privacy Policy
              </div>
              <div className="text-xs cursor-pointer text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors uppercase tracking-widest">
                Terms of Service
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
