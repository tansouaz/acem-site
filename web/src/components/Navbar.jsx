import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const primaryLinks = [
  { name: "Anasayfa", link: "/" },
  { name: "Projeler", link: "/projects" },
];

const secondaryLinks = [
  { name: "Hakkımızda", link: "/about" },
  { name: "İletişim", link: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 24);

      if (currentScrollY < 40) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const desktopActiveClass =
    "bg-white/[0.10] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]";
  const desktopInactiveClass =
    "text-white/82 hover:bg-white/[0.05] hover:text-white";

  const mobileActiveClass = "bg-white/[0.08] text-white";
  const mobileInactiveClass =
    "text-white/82 hover:bg-white/[0.04] hover:text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex justify-center transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full pointer-events-none opacity-0"
      }`}
    >
      <div className="w-full max-w-7xl px-4 pt-4 md:px-8 lg:px-12">
        <div
          className={`relative flex items-center justify-between overflow-hidden rounded-[30px] border px-5 py-3.5 transition-all duration-500 md:px-6 ${
            scrolled || location.pathname === "/projects"
              ? "border-black/10 bg-black/70 shadow-[0_20px_70px_rgba(0,0,0,0.30)] backdrop-blur-2xl"
              : "border-white/10 bg-black/45 shadow-[0_20px_70px_rgba(0,0,0,0.20)] backdrop-blur-2xl"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[linear-gradient(90deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01),rgba(255,255,255,0.03))]" />
          <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_left,rgba(249,115,22,0.12),transparent_28%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

          <Link to="/" className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
              <img
                src="/logo.png"
                alt="ACEM Sanayi Logo"
                className="h-full w-full scale-110 object-contain"
              />
            </div>

            <div className="leading-tight">
              <p className="font-display text-[15px] font-bold tracking-tight text-white">
                ACEM SANAYİ
              </p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/60">
                PREFABRİK & MODÜLER YAPILAR
              </p>
            </div>
          </Link>

          <nav className="relative z-10 hidden items-center gap-1 md:flex">
            {primaryLinks.map((item) => (
              <NavLink key={item.name} to={item.link} end={item.link === "/"}>
                {({ isActive }) => (
                  <span
                    className={`group relative inline-block rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                      isActive ? desktopActiveClass : desktopInactiveClass
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-orange-500 transition-all duration-300 ${
                        isActive
                          ? "w-6 opacity-100"
                          : "w-0 opacity-0 group-hover:w-6 group-hover:opacity-100"
                      }`}
                    />
                  </span>
                )}
              </NavLink>
            ))}

            {secondaryLinks.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className="group relative inline-block rounded-xl px-4 py-2.5 text-sm font-medium text-white/82 transition-all duration-300 hover:bg-white/[0.05] hover:text-white"
              >
                {item.name}
                <span className="absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-orange-500 opacity-0 transition-all duration-300 group-hover:w-6 group-hover:opacity-100" />
              </Link>
            ))}
          </nav>

          <div className="relative z-10 hidden md:block">
            <Link
              to="/teklif-al"
              className="group inline-flex items-center rounded-2xl border border-white/14 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/22 hover:bg-white/[0.10]"
            >
              Ücretsiz Teklif Al
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white backdrop-blur-xl md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            mobileOpen ? "max-h-96 pt-3 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-[24px] border border-white/10 bg-black/75 p-3 shadow-[0_18px_60px_rgba(0,0,0,0.30)] backdrop-blur-2xl">
            <div className="space-y-1">
              {primaryLinks.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.link}
                  end={item.link === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive ? mobileActiveClass : mobileInactiveClass
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              {secondaryLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${mobileInactiveClass}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <Link
              to="/teklif-al"
              onClick={() => setMobileOpen(false)}
              className="mt-3 block rounded-xl bg-orange-500 px-4 py-3 text-center font-semibold text-white transition hover:bg-orange-400"
            >
              Teklif Al
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
