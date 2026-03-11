import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="relative">
        <Outlet />

        {/* Global footer separator */}
        <div className="pointer-events-none relative z-10 h-24 bg-gradient-to-b from-transparent via-black/35 to-black" />
      </main>

      <Footer />
    </div>
  );
}
