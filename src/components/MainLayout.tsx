import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <div className="main-layout">
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;
