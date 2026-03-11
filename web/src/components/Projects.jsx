import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projectsData } from "../data/projectsData";

function Projects() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.16]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.92, 0.72]);

  return (
    <section ref={sectionRef} className="relative z-10 overflow-hidden py-28">
      <motion.img
        src="/home-background.png"
        alt="ACEM Projects Background"
        style={{
          scale: bgScale,
          y: bgY,
          opacity: bgOpacity,
        }}
        className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.34] contrast-[1.05] will-change-transform"
      />

      <div className="absolute inset-0 bg-[#05070d]/72" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070d]/80 via-[#070c16]/72 to-[#0b1220]/88" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/20" />

      <div className="pointer-events-none absolute left-1/2 top-20 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Faaliyet Alanlarımız
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-300">
            ACEM SANAYI İÇ VE DIŞ TİC. LTD. ŞTİ.’nin uzmanlık alanlarını
            yansıtan proje ve hizmetler.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="group relative h-[480px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_28px_70px_rgba(0,0,0,0.5)]"
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition duration-500 group-hover:from-black/88 group-hover:via-black/42" />

              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="text-2xl font-semibold text-white transition duration-500 ease-out group-hover:-translate-y-12">
                  {project.title}
                </h3>

                <div className="translate-y-6 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="mb-4 text-sm leading-relaxed text-gray-200">
                    {project.shortDescription}
                  </p>

                  <Link
                    to={`/projects#${project.slug}`}
                    className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white hover:text-gray-900"
                  >
                    Detayları Gör
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
