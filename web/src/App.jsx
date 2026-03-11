import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import QuotePage from "./components/QuotePage";
import Footer from "./components/Footer";
import ProjectsPage from "./components/ProjectsPage";
import ScrollToTop from "./components/ScrollToTop";

function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      {/* <About />
      <Contact /> */}
    </>
  );
}

export default function App() {
  return (
    <div className="bg-black font-sans text-white">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/teklif-al" element={<QuotePage />} />
      </Routes>
      <Footer />
    </div>
  );
}
