import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Building2,
  MapPin,
  ChevronDown,
  CheckCircle2,
  MapPinned,
  Briefcase,
} from "lucide-react";
import { getCities, getDistrictsByCityCode } from "turkey-neighbourhoods";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PROJECT_TYPES = [
  "Prefabrik Yapı",
  "Modüler Yapı",
  "Çelik Konstrüksiyon",
  "Yol ve Köprü",
  "Maden Endüstrisi",
  "Diğer",
];

function normalizeTurkeyPhone(input) {
  let digits = input.replace(/\D/g, "");

  if (digits.startsWith("90") && digits.length > 10) {
    digits = digits.slice(2);
  }

  if (digits.startsWith("0") && digits.length > 10) {
    digits = digits.slice(1);
  }

  return digits;
}

function formatTurkeyPhone(input) {
  const digits = normalizeTurkeyPhone(input).slice(0, 10);

  if (!digits.length) return "";

  const p1 = digits.slice(0, 3);
  const p2 = digits.slice(3, 6);
  const p3 = digits.slice(6, 8);
  const p4 = digits.slice(8, 10);

  let formatted = p1;
  if (p2) formatted += ` ${p2}`;
  if (p3) formatted += ` ${p3}`;
  if (p4) formatted += ` ${p4}`;

  return formatted;
}

function isValidTurkeyPhone(input) {
  const digits = normalizeTurkeyPhone(input);
  return /^5\d{9}$/.test(digits);
}

export default function QuotePage() {
  const textareaRef = useRef(null);

  const cities = useMemo(() => getCities(), []);
  const [districts, setDistricts] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    projectType: "",
    cityCode: "",
    cityName: "",
    district: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [formData.message]);

  useEffect(() => {
    if (!formData.cityCode) {
      setDistricts([]);
      return;
    }

    const nextDistricts = getDistrictsByCityCode(formData.cityCode);
    setDistricts(nextDistricts);
  }, [formData.cityCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const normalized = normalizeTurkeyPhone(value);
      const limited = normalized.slice(0, 10);

      setFormData((prev) => ({
        ...prev,
        phone: limited,
      }));

      setErrors((prev) => ({
        ...prev,
        phone: "",
      }));
      return;
    }

    if (name === "cityCode") {
      const selectedCity = cities.find((item) => item.code === value);

      setFormData((prev) => ({
        ...prev,
        cityCode: value,
        cityName: selectedCity?.name || "",
        district: "",
      }));

      setErrors((prev) => ({
        ...prev,
        cityCode: "",
        district: "",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Ad Soyad zorunludur.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "E-posta zorunludur.";
    } else if (!EMAIL_REGEX.test(formData.email)) {
      nextErrors.email = "Geçerli bir e-posta girin.";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Telefon zorunludur.";
    } else if (!isValidTurkeyPhone(formData.phone)) {
      nextErrors.phone = "Geçerli bir Türkiye cep telefonu girin.";
    }

    if (!formData.projectType.trim()) {
      nextErrors.projectType = "Proje türü seçiniz.";
    }

    if (!formData.cityCode.trim()) {
      nextErrors.cityCode = "İl seçiniz.";
    }

    if (!formData.district.trim()) {
      nextErrors.district = "İlçe seçiniz.";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Proje detayı zorunludur.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildMessage = () => {
    return `Merhaba, yeni bir teklif talebi oluşturmak istiyorum.

Ad Soyad: ${formData.fullName || "-"}
Firma Adı: ${formData.companyName || "-"}
E-posta: ${formData.email || "-"}
Telefon: ${formatTurkeyPhone(formData.phone) || "-"}
Proje Türü: ${formData.projectType || "-"}
İl: ${formData.cityName || "-"}
İlçe: ${formData.district || "-"}
Proje Detayı: ${formData.message || "-"}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setShowSuccessModal(true);
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      projectType: "",
      cityCode: "",
      cityName: "",
      district: "",
      message: "",
    });
    setDistricts([]);
    setErrors({});
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(buildMessage());
    const whatsappUrl = `https://wa.me/905379938782?text=${text}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setShowSuccessModal(false);
    resetForm();
  };

  const handleEmailSend = () => {
    const subject = encodeURIComponent("Yeni Teklif Talebi");
    const body = encodeURIComponent(buildMessage());
    window.location.href = `mailto:info@acem.tc?subject=${subject}&body=${body}`;
    setShowSuccessModal(false);
    resetForm();
  };

  return (
    <section className="relative min-h-screen overflow-hidden pt-44 pb-20 text-white md:pt-48 md:pb-24">
      {/* cinematic background */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#120904_0%,#1a0d05_30%,#0a0a0a_100%)]" />

      <div className="absolute left-[10%] top-[8%] h-[420px] w-[420px] rounded-full bg-orange-500/20 blur-[120px]" />

      <div className="absolute right-[10%] top-[18%] h-[420px] w-[420px] rounded-full bg-orange-400/10 blur-[140px]" />

      <div className="absolute bottom-[-10%] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[160px]" />
      {/* hero light */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_40%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.08),transparent_45%)]" />
      {/*Background */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#120904_0%,#1a0d05_22%,#100905_48%,#07090d_100%)]" />
      <div className="absolute left-[8%] top-[10%] h-72 w-72 rounded-full bg-orange-500/14 blur-3xl" />
      <div className="absolute right-[10%] top-[18%] h-80 w-80 rounded-full bg-amber-400/8 blur-3xl" />
      <div className="absolute left-1/2 top-[14%] h-56 w-[36rem] -translate-x-1/2 rounded-full bg-white/5 blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_26%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,20,0.06),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.24),transparent_22%,transparent_78%,rgba(0,0,0,0.24))]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0b0f14_0%,#111722_34%,#0b0e13_100%)]" />
      <div className="absolute left-[8%] top-[10%] h-72 w-72 rounded-full bg-orange-500/14 blur-3xl" />
      <div className="absolute right-[10%] top-[18%] h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_26%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-10 text-center sm:mb-12 md:mb-14"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-orange-400 sm:text-sm sm:tracking-[0.38em]">
              ÜCRETSİZ TEKLİF AL
            </p>

            <h1 className="mx-auto max-w-5xl text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Projeniz İçin Hızlı Teklif Oluşturun
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-white/68 sm:text-lg sm:leading-8">
              Projenize uygun çözüm ve fiyatlandırma için formu doldurun.
              Talebinizi doğrudan WhatsApp veya e-posta ile iletebilirsiniz.
            </p>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="relative overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.045] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.44)] backdrop-blur-2xl sm:rounded-[32px] sm:p-6 md:rounded-[36px] md:p-8 lg:rounded-[38px] lg:p-10"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-80" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_24%)]" />
            <div className="pointer-events-none absolute inset-[1px] rounded-[27px] border border-white/8 sm:rounded-[31px] md:rounded-[35px] lg:rounded-[37px]" />

            <form
              onSubmit={handleSubmit}
              className="relative grid gap-5 sm:gap-6"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <FloatingInput
                  label="Ad Soyad"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
                  required
                  icon={<Building2 size={16} />}
                />

                <FloatingInput
                  label="Firma Adı"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  error={errors.companyName}
                  icon={<Briefcase size={16} />}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <FloatingInput
                  label="E-posta"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                  icon={<Mail size={16} />}
                />

                <FloatingInput
                  label="Telefon"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  value={formatTurkeyPhone(formData.phone)}
                  onChange={handleChange}
                  error={errors.phone}
                  required
                  icon={<Phone size={16} />}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <FloatingSelect
                  label="Proje Türü"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  error={errors.projectType}
                  required
                  options={PROJECT_TYPES}
                />

                <FloatingSelect
                  label="İl"
                  name="cityCode"
                  value={formData.cityCode}
                  onChange={handleChange}
                  error={errors.cityCode}
                  required
                  icon={<MapPinned size={16} />}
                  options={cities.map((city) => ({
                    label: city.name,
                    value: city.code,
                  }))}
                />

                <FloatingSelect
                  label="İlçe"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  error={errors.district}
                  required
                  disabled={!formData.cityCode}
                  icon={<MapPin size={16} />}
                  options={districts.map((district) => ({
                    label: district,
                    value: district,
                  }))}
                />
              </div>

              <FloatingTextarea
                refProp={textareaRef}
                label="Proje Detayı"
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                required
              />

              <div className="flex flex-col gap-4 pt-1 md:flex-row md:items-center md:justify-between">
                <p className="max-w-xl text-sm leading-6 text-white/42">
                  Formu tamamladıktan sonra teklif talebinizi doğrudan
                  gönderebilirsiniz.
                </p>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-orange-500 px-7 py-4 text-base font-semibold text-white shadow-[0_14px_36px_rgba(249,115,22,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-orange-400 md:w-auto md:min-w-[220px]"
                >
                  Talebi Hazırla
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Success modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-4 sm:px-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-xl overflow-hidden rounded-[26px] border border-white/12 bg-[#121318]/90 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:rounded-[30px] sm:p-8"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-80" />
              <div className="pointer-events-none absolute inset-[1px] rounded-[25px] border border-white/8 sm:rounded-[29px]" />

              <div className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-green-400/20 bg-green-500/10 text-green-300">
                  <CheckCircle2 size={30} />
                </div>

                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Talebiniz Hazır
                </h3>

                <p className="mx-auto mt-4 max-w-md leading-7 text-white/68">
                  Teklif talebinizi şimdi doğrudan WhatsApp veya e-posta ile
                  bize gönderebilirsiniz.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppSend}
                    className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-6 py-4 text-base font-semibold text-white shadow-[0_14px_36px_rgba(249,115,22,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-orange-400"
                  >
                    WhatsApp ile Gönder
                  </button>

                  <button
                    type="button"
                    onClick={handleEmailSend}
                    className="inline-flex items-center justify-center rounded-2xl border border-white/16 bg-white/[0.05] px-6 py-4 text-base font-semibold text-white transition duration-300 hover:bg-white/[0.08]"
                  >
                    E-posta ile Gönder
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowSuccessModal(false)}
                  className="mt-4 inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm text-white/45 transition hover:text-white/70"
                >
                  Kapat
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Reusable fields ---------- */

function FieldError({ error }) {
  if (!error) return null;
  return <p className="mt-2 text-xs text-red-300">{error}</p>;
}

function FloatingInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  inputMode,
  required = false,
  icon,
  error,
}) {
  const active = value?.length > 0;

  return (
    <div className="relative">
      <div
        className={`relative overflow-hidden rounded-2xl border bg-white/[0.04] transition-all duration-300 ${
          error
            ? "border-red-400/40"
            : "border-white/14 focus-within:border-orange-400/50 hover:border-orange-400/30"
        } focus-within:bg-white/[0.07] hover:bg-white/[0.06] focus-within:shadow-[0_0_0_4px_rgba(249,115,22,0.08)]`}
      >
        <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white/35">
          {icon}
        </div>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          inputMode={inputMode}
          placeholder=" "
          className="peer w-full bg-transparent px-12 pb-4 pt-7 text-white outline-none"
        />

        <label
          className={`pointer-events-none absolute left-12 transition-all duration-200 ${
            active
              ? "top-3 text-xs text-orange-300"
              : "top-1/2 -translate-y-1/2 text-base text-white/35 peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-orange-300"
          }`}
        >
          {label}
        </label>
      </div>

      <FieldError error={error} />
    </div>
  );
}

function FloatingSelect({
  label,
  name,
  value,
  onChange,
  required,
  options,
  icon,
  error,
  disabled = false,
}) {
  const active = value?.length > 0;

  return (
    <div className="relative">
      <div
        className={`relative overflow-hidden rounded-2xl border bg-white/[0.04] transition ${
          error ? "border-red-400/40" : "border-white/14"
        } ${disabled ? "opacity-60" : ""} focus-within:border-orange-400/40 focus-within:bg-white/[0.06] focus-within:shadow-[0_0_0_4px_rgba(249,115,22,0.08)]`}
      >
        {icon ? (
          <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white/35">
            {icon}
          </div>
        ) : null}

        <div className="pointer-events-none absolute right-4 top-1/2 z-10 -translate-y-1/2 text-white/35">
          <ChevronDown size={18} />
        </div>

        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`peer w-full appearance-none bg-transparent pb-4 pt-7 text-white outline-none ${
            icon ? "px-12" : "px-4"
          }`}
        >
          <option value="" className="text-black">
            Seçiniz
          </option>

          {options.map((option) => {
            const normalized =
              typeof option === "string"
                ? { label: option, value: option }
                : option;

            return (
              <option
                key={normalized.value}
                value={normalized.value}
                className="text-black"
              >
                {normalized.label}
              </option>
            );
          })}
        </select>

        <label
          className={`pointer-events-none absolute transition-all duration-200 ${
            icon ? "left-12" : "left-4"
          } ${
            active
              ? "top-3 text-xs text-orange-300"
              : "top-1/2 -translate-y-1/2 text-base text-white/35 peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-orange-300"
          }`}
        >
          {label}
        </label>
      </div>

      <FieldError error={error} />
    </div>
  );
}

function FloatingTextarea({
  refProp,
  label,
  name,
  value,
  onChange,
  required = false,
  error,
}) {
  const active = value?.length > 0;

  return (
    <div className="relative">
      <div
        className={`relative overflow-hidden rounded-2xl border bg-white/[0.04] transition ${
          error
            ? "border-red-400/40"
            : "border-white/14 focus-within:border-orange-400/40"
        } focus-within:bg-white/[0.06] focus-within:shadow-[0_0_0_4px_rgba(249,115,22,0.08)]`}
      >
        <textarea
          ref={refProp}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={1}
          placeholder=" "
          className="peer min-h-[170px] w-full resize-none bg-transparent px-4 pb-4 pt-8 text-white outline-none"
        />

        <label
          className={`pointer-events-none absolute left-4 transition-all duration-200 ${
            active
              ? "top-3 text-xs text-orange-300"
              : "top-7 text-base text-white/35 peer-focus:top-3 peer-focus:text-xs peer-focus:text-orange-300"
          }`}
        >
          {label}
        </label>
      </div>

      <FieldError error={error} />
    </div>
  );
}
