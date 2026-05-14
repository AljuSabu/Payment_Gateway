import { Helmet } from "react-helmet";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "../../pages/CartDrawer";

const Layout = ({ description, keywords, author, title }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="min-h-screen pt-16 overflow-hidden">
        <Navbar onOpenCart={() => setIsCartOpen(true)} />

        <main className="grow">
          <Outlet context={{ onOpenCart: () => setIsCartOpen(true) }} />
        </main>

        <Footer />

        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </>
  );
};

export default Layout;
