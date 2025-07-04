import { Outlet } from "react-router";
import { Navbar } from "../pages/Navbar/Navbar";
import { Footer } from "../pages/Footer/Footer";

export const Layout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="w-[90%] mx-auto my-5">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};
