import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const { scrollYProgress } = useScroll();

  const imageScale = useTransform(scrollYProgress, [0, 0.35], [1.03, 1.18]);
  const imageY = useTransform(scrollYProgress, [0, 0.35], [0, 90]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.82]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-32 md:pt-36">
      <motion.img
        src="/home-background.png"
        alt="ACEM Prefabrik Ev"
        style={{
          scale: imageScale,
          y: imageY,
          opacity: imageOpacity,
        }}
        className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.72] contrast-[1.05] will-change-transform"
      />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-black/22" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-black/18 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(0,0,0,0.18),transparent_40%)]" />

      {/* Warm cinematic glow */}
      <div className="pointer-events-none absolute left-[8%] top-[20%] h-64 w-64 rounded-full bg-orange-500/10 blur-[140px]" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-start">
        <div className="w-full max-w-7xl px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.6 }}
              className="mb-8 flex items-center gap-4"
            >
              <span className="h-px w-12 bg-orange-500/75" />
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/72">
                MODERN MODÜLER YAŞAM
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.7 }}
              className="font-display leading-[0.9] tracking-[-0.05em]"
            >
              <span className="hero-brand block text-[4.2rem] font-semibold leading-none tracking-[-0.05em] sm:text-[5rem] md:text-[6.2rem] lg:text-[7rem]">
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-300 bg-clip-text text-transparent">
                  ACEM
                </span>{" "}
                <span className="bg-gradient-to-r from-gray-600 via-gray-400 to-gray-300 bg-clip-text text-transparent">
                  SANAYİ
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.7 }}
              className="mt-8 max-w-lg text-[18px] font-light leading-[1.7] text-white/90 md:text-[20px]"
            >
              Modern Prefabrik Ev Sistemleri
              <br />
              Estetik, Dayanıklı ve Sürdürülebilir Modüler Yaşam Çözümleri
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              {/* Secondary: Projeler */}
              <motion.a
                href="/projects"
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="inline-flex min-w-[140px] items-center justify-center rounded-2xl border border-white/14 bg-white/[0.045] px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/24 hover:bg-white/[0.08]"
              >
                Projeler
              </motion.a>

              {/* Secondary: İletişim */}
              <motion.a
                href="/contact"
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="inline-flex min-w-[140px] items-center justify-center rounded-2xl border border-white/14 bg-white/[0.045] px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/24 hover:bg-white/[0.08]"
              >
                İletişim
              </motion.a>

              {/* Primary CTA: Ücretsiz Teklif Al */}
              <motion.a
                href="/teklif-al"
                whileHover={{ y: -5, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="group relative inline-flex min-w-[190px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_70px_rgba(249,115,22,0.40)] ring-1 ring-orange-300/20"
              >
                <span className="relative z-10">Ücretsiz Teklif Al</span>

                {/* moving light sweep */}
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.22),transparent)] translate-x-[-120%] transition-transform duration-700 group-hover:translate-x-[120%]" />

                {/* soft glow */}
                <span className="pointer-events-none absolute inset-0 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 bg-orange-300/20" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
