import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Phone,
  Smartphone,
  MapPin,
  Factory,
  ArrowUpRight,
  Building2,
  Clock3,
  ShieldCheck,
  Copy,
  Check,
} from "lucide-react";

/* =========================
   DATA
========================= */
const contactItems = [
  {
    icon: Mail,
    label: "E-posta",
    value: "info@acem.tc",
    href: "mailto:info@acem.tc",
    subtext: "Kurumsal iletişim ve proje talepleri",
    copyValue: "info@acem.tc",
  },
  {
    icon: Smartphone,
    label: "Cep Telefonu",
    value: "+90 549 459 2424",
    href: "tel:+905494592424",
    subtext: "Doğrudan mobil iletişim",
    copyValue: "+905494592424",
  },
  {
    icon: Phone,
    label: "Sabit Hat",
    value: "0212 999 0085",
    href: "tel:02129990085",
    subtext: "Ofis iletişim hattı",
    copyValue: "02129990085",
  },
];

const locationItems = [
  {
    icon: MapPin,
    label: "Merkez Ofis",
    title: "İstanbul Ofis",
    address:
      "Bahçeşehir 2. Kısım Mahallesi, Posta Caddesi, Loca Binası No: 6, A Blok, Kat: 5, Daire: 70, 34488 Başakşehir / İstanbul",
    href: "https://maps.app.goo.gl/5HEcEUCAbFgBPTGb6?g_st=ic",
  },
  {
    icon: Factory,
    label: "Üretim Tesisi",
    title: "Fabrika",
    address:
      "Sungurlu Organize Sanayi Bölgesi, Yorgalı Köyü, Mevki 6. Sokak, No: 14, Sungurlu / Çorum",
    href: "https://maps.app.goo.gl/aaHxqMipTUhdd2sE9?g_st=ic",
  },
];

const quickInfo = [
  {
    icon: Building2,
    title: "Kurumsal İletişim",
    text: "Proje talepleri, iş birlikleri ve teklif süreçleri",
  },
  {
    icon: Clock3,
    title: "Hızlı Geri Dönüş",
    text: "İletişim talepleriniz için hızlı ve doğrudan erişim",
  },
  {
    icon: ShieldCheck,
    title: "Güvenilir İletişim",
    text: "Kurumsal ve düzenli iletişim altyapısı",
  },
];

const whatsappLink =
  "https://wa.me/905379938782?text=Merhaba%20ACEM%20SANAYI%2C%20bilgi%20almak%20istiyorum.";

/* =========================
   REVEAL ANIMATION
========================= */
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
      { threshold: 0.14 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-1000 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* =========================
   WHATSAPP ICON
========================= */
function WhatsAppIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19.11 17.23c-.28-.14-1.65-.81-1.91-.9-.25-.09-.44-.14-.62.14-.18.28-.71.9-.87 1.09-.16.19-.33.21-.61.07-.28-.14-1.2-.44-2.28-1.39-.84-.75-1.41-1.67-1.58-1.95-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.62-1.51-.86-2.07-.23-.55-.46-.47-.62-.47h-.53c-.19 0-.49.07-.74.35-.25.28-.97.95-.97 2.31s1 2.68 1.14 2.86c.14.19 1.96 3 4.75 4.21.66.28 1.17.45 1.57.57.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.88-1.31.23-.64.23-1.19.16-1.31-.07-.11-.25-.18-.53-.32Z" />
      <path d="M16.01 3.2c-6.96 0-12.62 5.63-12.62 12.56 0 2.22.58 4.38 1.68 6.28L3 29l7.18-1.88a12.67 12.67 0 0 0 5.83 1.4h.01c6.95 0 12.61-5.63 12.61-12.56 0-3.36-1.31-6.53-3.7-8.91A12.56 12.56 0 0 0 16.01 3.2Zm0 22.99h-.01a10.5 10.5 0 0 1-5.35-1.47l-.38-.23-4.26 1.11 1.14-4.14-.25-.42a10.38 10.38 0 0 1-1.6-5.47c0-5.74 4.7-10.41 10.48-10.41 2.8 0 5.42 1.08 7.4 3.04a10.31 10.31 0 0 1 3.08 7.37c0 5.74-4.7 10.41-10.25 10.62Z" />
    </svg>
  );
}

/* =========================
   SMALL UTILITIES
========================= */
function CopyButton({ value, label, dark = false }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e) {
    e.preventDefault();
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.20em] transition duration-300 ${
        dark
          ? "border border-white/18 bg-white/10 text-white hover:bg-white/15"
          : "border border-white/12 bg-white/[0.04] text-white/68 hover:border-white/18 hover:bg-white/[0.06] hover:text-white"
      }`}
      aria-label={`${label} kopyala`}
      title={`${label} kopyala`}
    >
      {copied ? (
        <Check size={13} className="text-orange-400" />
      ) : (
        <Copy size={13} />
      )}
      {copied ? "Kopyalandı" : "Kopyala"}
    </button>
  );
}

function ActionChip({ href, text, icon, targetBlank = false, dark = false }) {
  const Icon = icon;

  return (
    <a
      href={href}
      target={targetBlank ? "_blank" : undefined}
      rel={targetBlank ? "noreferrer" : undefined}
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.20em] transition duration-300 ${
        dark
          ? "border border-white/18 bg-white/10 text-white hover:bg-white/15"
          : "border border-white/12 bg-white/[0.04] text-white/68 hover:border-white/18 hover:bg-white/[0.06] hover:text-white"
      }`}
    >
      <Icon size={13} className={dark ? "text-white" : "text-orange-400"} />
      {text}
    </a>
  );
}

/* =========================
   SMALL TOP CARDS
========================= */
function QuickInfoCard({ item }) {
  const Icon = item.icon;

  return (
    <div className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] p-4 shadow-[0_14px_40px_rgba(0,0,0,0.16)] backdrop-blur-2xl transition duration-300 hover:border-white/14 hover:bg-white/[0.04]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),transparent_40%,rgba(255,255,255,0.01))]" />

      <div className="relative flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-orange-400 transition duration-300 group-hover:scale-105">
          <Icon size={18} />
        </div>

        <div>
          <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-white">
            {item.title}
          </h3>
          <p className="mt-1 text-[12px] leading-6 text-white/58">
            {item.text}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================
   LEFT CONTACT CARD
========================= */
function ContactCard({ item }) {
  const Icon = item.icon;

  return (
    <RevealSection>
      <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.05] hover:shadow-[0_26px_70px_rgba(0,0,0,0.34)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_40%,rgba(255,255,255,0.015))]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

        <div className="relative flex items-start gap-4">
          <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.05] text-orange-400 transition duration-500 group-hover:scale-105">
            <Icon size={22} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-[0.30em] text-white/38">
              {item.label}
            </p>

            <a
              href={item.href}
              className="mt-3 block text-[22px] font-semibold leading-none tracking-[-0.03em] text-white transition duration-300 hover:text-orange-300 md:text-[24px]"
            >
              {item.value}
            </a>

            <p className="mt-3 text-[12px] leading-6 text-white/48">
              {item.subtext}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <ActionChip href={item.href} text="Aç" icon={ArrowUpRight} />
              <CopyButton value={item.copyValue} label={item.label} />
            </div>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/25 transition duration-300 group-hover:border-white/14 group-hover:text-orange-400">
            <ArrowUpRight
              size={15}
              className="transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

/* =========================
   RIGHT LOCATION CARD
========================= */
function LocationCard({ item, delay = 0 }) {
  const Icon = item.icon;

  return (
    <RevealSection delay={delay}>
      <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.05] hover:shadow-[0_26px_70px_rgba(0,0,0,0.34)] md:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_40%,rgba(255,255,255,0.015))]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.04),transparent_28%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

        <div className="relative">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-13 w-13 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.05] text-orange-400">
                <Icon size={22} />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">
                  {item.label}
                </p>
                <h3 className="mt-2 text-[28px] font-semibold leading-none tracking-[-0.03em] text-white md:text-[30px]">
                  {item.title}
                </h3>
              </div>
            </div>

            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/28 transition duration-300 hover:border-white/14 hover:text-orange-400"
            >
              <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="rounded-[26px] border border-white/10 bg-black/20 p-5">
            <p className="text-[14px] leading-7 text-white/68 md:text-[15px] md:leading-8">
              {item.address}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <ActionChip
                href={item.href}
                text="Haritada Aç"
                icon={MapPin}
                targetBlank
              />
              <CopyButton value={item.address} label={item.title} />
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

/* =========================
   MAIN CONTACT
========================= */
export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-[#171717] via-[#3e3c3a] to-[#545353] py-24 text-white md:py-28"
    >
      {/* Main background overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.012),transparent_18%,transparent_82%,rgba(255,255,255,0.012))]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.03),transparent_22%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.02),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <RevealSection>
          <div className="mb-14 pt-8 text-center md:mb-16 md:pt-10">
            <div className="inline-flex items-center rounded-full border border-orange-400/15 bg-orange-500/8 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.34em] text-orange-400">
              ACEM SANAYI
            </div>

            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
              İletişim
            </h2>

            <div className="mx-auto mt-6 h-[2px] w-16 rounded-full bg-orange-500" />

            <p className="mx-auto mt-8 max-w-3xl text-[16px] leading-8 text-white/65 md:text-[17px]">
              Proje talepleriniz, iş birlikleri ve kurumsal iletişim süreçleri
              için bizimle doğrudan iletişime geçebilirsiniz.
            </p>
          </div>
        </RevealSection>

        {/* Top quick cards */}
        <RevealSection delay={80}>
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            {quickInfo.map((item) => (
              <QuickInfoCard key={item.title} item={item} />
            ))}
          </div>
        </RevealSection>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-12">
          {/* Left column */}
          <div className="xl:col-span-5">
            <div className="grid gap-5">
              {contactItems.map((item, index) => (
                <ContactCard key={item.label} item={item} delay={index * 70} />
              ))}

              {/* WhatsApp card */}
              <RevealSection delay={220}>
                <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-r px-6 py-6 text-white shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
                  {/* Orange side accents */}
                  <div className="absolute left-0 top-8 h-[80%] w-3 rounded-r-[20px] bg-[linear-gradient(180deg,#f97316,#fb923c)]" />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%,rgba(255,255,255,0.01))]" />

                  <div className="relative flex items-center justify-between gap-4">
                    <div className="flex items-center gap-5">
                      <div className="flex h-16 w-16 items-center justify-center rounded-[22px] border border-white/18 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                        <WhatsAppIcon className="h-7 w-7 text-green-400" />
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-[0.32em] text-white/82">
                          WhatsApp Hattı
                        </p>

                        <p className="mt-3 text-[28px] font-semibold leading-none tracking-[-0.03em] md:text-[30px]">
                          +90 537 993 87 82
                        </p>

                        <p className="mt-4 max-w-md text-[13px] leading-7 text-white/78">
                          WhatsApp üzerinden hızlı iletişim sağlayın.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.20em] text-white transition duration-300 hover:bg-white/15"
                          >
                            <WhatsAppIcon className="h-[13px] w-[13px] text-green-400" />
                            WhatsApp’ta Aç
                          </a>

                          <CopyButton
                            value="+905379938782"
                            label="WhatsApp"
                            dark
                          />
                        </div>
                      </div>
                    </div>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-white/18 bg-white/10 text-white md:flex"
                    >
                      <ArrowUpRight size={20} />
                    </a>
                  </div>
                </div>
              </RevealSection>
            </div>
          </div>

          {/* Right column */}
          <div className="xl:col-span-7">
            <div className="grid gap-5">
              {locationItems.map((item, index) => (
                <LocationCard
                  key={item.title}
                  item={item}
                  delay={100 + index * 80}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
