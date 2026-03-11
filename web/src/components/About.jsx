import { useEffect, useRef, useState } from "react";
import {
  Building2,
  Factory,
  ShieldCheck,
  Cog,
  Wrench,
  HardHat,
} from "lucide-react";

const activityAreas = [
  "Kaynaklı ve civatalı büyük ölçekli çelik yapıların imalatı ve montajı",
  "Endüstriyel yapıların üretimi ve montajı (pipe rack sistemleri, galeriler, endüstriyel salonlar vb.)",
  "Endüstriyel ekipmanların tasarımı, üretimi, kurulumu ve montajı",
  "Endüstriyel boru hatlarının üretimi ve montajı",
  "İnşaat projelerinin yürütülmesi ve proje yönetimi",
  "Prefabrik konut ve villa üretimi ve inşaatı",
  "Endüstriyel atölye ve tesislerin kurulumu ve ekipmanlandırılması",
];

const highlights = [
  {
    icon: Factory,
    title: "18.000 m² Üretim Alanı",
    description:
      "Modern üretim altyapımız ile büyük ölçekli endüstriyel projelere güçlü çözümler sunuyoruz.",
  },
  {
    icon: Cog,
    title: "1000 Ton / Aylık Kapasite",
    description:
      "Aylık yüksek üretim kapasitemiz sayesinde çelik konstrüksiyon ve ekipman üretimini güvenle sürdürüyoruz.",
  },
  {
    icon: ShieldCheck,
    title: "Kalite ve Güvenlik",
    description:
      "Tüm süreçlerimizde kalite standartlarını, iş güvenliğini ve müşteri memnuniyetini ön planda tutuyoruz.",
  },
];

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
      { threshold: 0.15 },
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

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-[#1e110b] via-[#362912] to-[#894a10] py-24 text-white md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.08),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_20%,transparent_80%,rgba(255,255,255,0.02))]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <RevealSection>
          <div className="mb-14 pt-6 text-center md:mb-16 md:pt-8">
            <div className="inline-flex items-center rounded-full border border-orange-400/15 bg-orange-500/8 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.34em] text-orange-400">
              ACEM SANAYI
            </div>

            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
              Hakkımızda
            </h2>

            <div className="mx-auto mt-6 h-[2px] w-16 rounded-full bg-orange-500" />

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white/70">
              1997 yılından bu yana endüstriyel çelik yapılar, ekipman üretimi
              ve mühendislik çözümleri alanlarında güvenilir, güçlü ve
              sürdürülebilir hizmetler sunuyoruz.
            </p>
          </div>
        </RevealSection>

        <RevealSection delay={100}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:p-10">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_40%,rgba(255,255,255,0.015))]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

                <div className="relative">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-300">
                    <Building2 size={16} />
                    Kurumsal Profil
                  </div>

                  <div className="space-y-5 text-base leading-8 text-white/75 md:text-lg">
                    <p>
                      <span className="font-semibold text-white">
                        ACEM SANAYI İÇ VE DIŞ TİCARET LTD. ŞTİ.
                      </span>{" "}
                      1997 yılında kurulmuş olup, endüstriyel çelik yapılar,
                      mühendislik çözümleri ve endüstriyel ekipman üretimi
                      alanlarında faaliyet göstermektedir.
                    </p>

                    <p>
                      Kurulduğu günden bu yana uzman ve deneyimli insan
                      kaynağıyla; petrol, doğalgaz, petrokimya, çimento ve
                      demir-çelik sektörleri başta olmak üzere farklı
                      endüstriyel alanlarda projeler gerçekleştirmiştir.
                    </p>

                    <p>
                      Şirketimiz, EPC projeleri kapsamında sabit ve rotatif
                      ekipmanların imalatı, kurulumu ve montajı alanlarında
                      çeşitli ulusal projelerde yer almış; güçlü teknik
                      altyapısı ile üretimden uygulamaya kadar entegre çözümler
                      sunmuştur.
                    </p>

                    <p>
                      Modern üretim kabiliyeti, ileri düzey yazılım ve donanım
                      imkanları sayesinde, büyük ölçekli projelerde kalite,
                      sürdürülebilirlik ve operasyonel verimlilik odaklı bir
                      hizmet anlayışı benimsemektedir.
                    </p>

                    <p>
                      Müşteri memnuniyeti, ürün kalitesi, iş güvenliği ve iş
                      sağlığı ilkelerini merkezine alan ACEM SANAYI, tüm
                      süreçlerinde IMS yönetim sistemlerinden yararlanarak
                      yüksek standartlı üretim ve uygulama yaklaşımını
                      sürdürmektedir.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid gap-6">
                <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.30)] backdrop-blur-2xl">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-orange-400">
                      <Factory size={22} />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.22em] text-white/45">
                        Üretim Gücü
                      </p>
                      <h3 className="text-xl font-semibold text-white">
                        Operasyonel Kapasite
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-sm text-white/50">Üretim Alanı</p>
                      <p className="mt-2 text-2xl font-semibold text-white">
                        18.000 m²
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-sm text-white/50">Aylık Kapasite</p>
                      <p className="mt-2 text-2xl font-semibold text-white">
                        1000 Ton
                      </p>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.30)] backdrop-blur-2xl">
                  <h3 className="mb-5 text-xl font-semibold text-white">
                    Sertifikasyon ve Standartlar
                  </h3>

                  <div className="space-y-3">
                    {[
                      "İnşaat alanında yetkinlik ve kalite odaklı uygulama yaklaşımı",
                      "Elektrik ve elektronik altyapı süreçlerinde teknik yeterlilik",
                      "Mekanik tesisat ve endüstriyel kurulum alanlarında uzmanlık",
                      "IMS yönetim sistemleri ile entegre kalite ve güvenlik anlayışı",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                      >
                        <ShieldCheck
                          size={18}
                          className="mt-0.5 text-orange-400"
                        />
                        <p className="text-sm leading-6 text-white/70">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection delay={180}>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.05]"
                  style={{ transitionDelay: `${index * 70}ms` }}
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-orange-400 transition duration-500 group-hover:scale-105">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-white/70">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </RevealSection>

        <RevealSection delay={260}>
          <div className="mt-16 overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur-2xl md:p-10">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-orange-400">
                  Faaliyet Alanlarımız
                </p>
                <h3 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  Uzmanlık ve Uygulama Alanları
                </h3>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/60">
                <HardHat size={16} className="text-orange-400" />
                Endüstriyel Çözümler
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {activityAreas.map((item, index) => (
                <div
                  key={item}
                  className="group flex gap-4 rounded-[24px] border border-white/10 bg-black/20 p-5 transition duration-300 hover:border-white/15 hover:bg-white/[0.03]"
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-orange-400">
                    {index % 3 === 0 ? (
                      <Wrench size={18} />
                    ) : index % 3 === 1 ? (
                      <Cog size={18} />
                    ) : (
                      <Factory size={18} />
                    )}
                  </div>

                  <p className="text-sm leading-7 text-white/75 md:text-[15px]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
