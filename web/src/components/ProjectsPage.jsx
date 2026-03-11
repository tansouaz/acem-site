import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { projectsData } from "../data/projectsData";

function RevealSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-1000 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ProjectsPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#363433] via-[#362912] to-[#341b03] pb-24 pt-32 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(249,115,22,0.05),transparent_18%,transparent_82%,rgba(249,115,22,0.05))]" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <RevealSection>
          <div className="mb-14 pt-6 text-center md:mb-16 md:pt-8">
            <div className="inline-flex items-center rounded-full border border-orange-400/15 bg-orange-500/8 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.34em] text-orange-400">
              ACEM SANAYI
            </div>

            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
              Projelerimiz
            </h2>
            <div className="relative inline-block">
              <span className="absolute left-1/2 top-full mt-6 h-[2px] w-16 -translate-x-1/2 rounded-full bg-orange-500" />
            </div>

            <p className="mx-auto mt-10 max-w-3xl text-lg leading-8 text-white/70">
              ACEM SANAYI İÇ VE DIŞ TİC. LTD. ŞTİ.’nin farklı sektörlerde
              gerçekleştirdiği proje ve hizmet alanlarını detaylı olarak
              inceleyebilirsiniz.
            </p>
          </div>
        </RevealSection>

        <div className="space-y-14 md:space-y-16">
          {projectsData.map((project, index) => (
            <RevealSection key={project.id} delay={index * 120}>
              <div
                id={project.slug}
                className="scroll-mt-32 relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.38)] backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.05] hover:shadow-[0_25px_70px_rgba(0,0,0,0.42)] md:p-8 lg:p-10"
              >
                {/* <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_40%,rgba(255,255,255,0.015))]" /> */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.08),transparent_28%)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

                <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-black/20">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-[380px] w-full object-cover object-center contrast-[1.05] saturate-[1.05] transition duration-700 hover:scale-[1.03] md:h-[420px]"
                      />
                    </div>
                  </div>

                  <div
                    className={`${index % 2 === 1 ? "lg:order-1" : ""} max-w-xl`}
                  >
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-orange-400">
                      Proje Alanı
                    </p>

                    <h2 className="mb-6 max-w-[14ch] text-3xl font-semibold tracking-tight text-white md:max-w-none md:text-5xl">
                      {project.title}
                    </h2>

                    <p className="text-lg leading-9 text-white/72">
                      {project.fullDescription}
                    </p>
                  </div>
                </div>

                {index !== projectsData.length - 1 && (
                  <div className="relative mt-10 md:mt-12">
                    <div className="mx-auto flex max-w-xs items-center justify-center gap-4">
                      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/20" />
                      <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_0_6px_rgba(251,146,60,0.14)]" />
                      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/20 to-white/20" />
                    </div>
                  </div>
                )}
              </div>
            </RevealSection>
          ))}
        </div>

        <RevealSection delay={150}>
          <div className="mt-20 md:mt-24">
            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] px-6 py-12 text-white shadow-[0_25px_80px_rgba(0,0,0,0.30)] backdrop-blur-2xl md:px-10 md:py-16">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_40%,rgba(255,255,255,0.02))]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.10),transparent_30%)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

              <div className="relative z-10 mx-auto max-w-4xl text-center">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-orange-400">
                  ACEM SANAYI
                </p>

                <h3 className="text-3xl font-semibold tracking-tight md:text-5xl">
                  Projeniz İçin Güçlü ve Güvenilir Çözümler
                </h3>

                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
                  Endüstriyel çelik yapılar, yol ve köprü inşaatı ile madencilik
                  sektörüne yönelik mühendislik çözümlerimiz hakkında daha fazla
                  bilgi almak için bizimle iletişime geçin.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    to="/contact"
                    className="inline-flex items-center rounded-2xl border border-orange-400/30 bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(249,115,22,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-orange-400"
                  >
                    Bizimle İletişime Geçin
                  </Link>

                  <Link
                    to="/"
                    className="inline-flex items-center rounded-2xl border border-white/14 bg-white/[0.05] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition duration-300 hover:bg-white/[0.09]"
                  >
                    Anasayfaya Dön
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

export default ProjectsPage;
