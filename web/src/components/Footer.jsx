import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const contactItems = [
    {
      label: "Office",
      href: "https://maps.app.goo.gl/5HEcEUCAbFgBPTGb6?g_st=ic",
      icon: MapPin,
      external: true,
    },
    {
      label: "Mail",
      href: "mailto:info@acem.tc",
      icon: Mail,
      external: false,
    },
    {
      label: "Phone",
      href: "tel:+905494592424",
      icon: Phone,
      external: false,
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black text-white">
      {/* Fixed footer background */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#020202_0%,#05070c_55%,#020202_100%)]" />
      <div className="absolute left-[12%] top-[10%] h-40 w-40 rounded-full bg-orange-500/8 blur-3xl" />
      <div className="absolute right-[10%] bottom-[10%] h-44 w-44 rounded-full bg-blue-500/8 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_24%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-4 md:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-4">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[18px] border border-white/15 bg-white/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/18 via-white/5 to-transparent" />
                <div className="absolute inset-[1px] rounded-[17px] border border-white/10" />
                <img
                  src="/logo.png"
                  alt="ACEM SANAYİ Logo"
                  className="relative z-10 h-7 w-7 object-contain"
                />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-[1.6rem] font-semibold leading-none tracking-[-0.03em] md:text-[1.9rem]">
                  <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-300 bg-clip-text text-transparent">
                    ACEM
                  </span>{" "}
                  <span className="bg-gradient-to-r from-gray-300 via-gray-100 to-gray-50 bg-clip-text text-transparent">
                    SANAYİ
                  </span>
                </h2>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {contactItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  title={item.label}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-[18px] border border-white/15 bg-white/[0.07] shadow-[0_8px_22px_rgba(0,0,0,0.22)] backdrop-blur-3xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.1] hover:border-white/20"
                >
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/18 via-white/[0.05] to-transparent" />
                  <span className="pointer-events-none absolute inset-[1px] rounded-[17px] border border-white/10" />

                  <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-orange-400/25 bg-black/20 text-orange-400 transition-all duration-300 group-hover:border-orange-400/40 group-hover:text-orange-300">
                    <Icon size={15} strokeWidth={2} />
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-3 border-t border-white/10 pt-3">
          <div className="flex flex-col gap-1 text-[0.78rem] text-white/36 md:flex-row md:items-center md:justify-between">
            <p>© 2026 ACEM SANAYİ. Tüm hakları saklıdır.</p>
            <p>İstanbul • Türkiye</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
