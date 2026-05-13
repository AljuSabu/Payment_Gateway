import { Helmet } from "react-helmet";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = ({ description, keywords, author, title }) => {
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
        <Navbar />

        <main className="grow">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
