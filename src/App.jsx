import { useEffect, useMemo, useState } from "react";
import { useLang } from "./i18n.jsx";
import { LEAD_DAYS } from "./data/catalog.js";
import { upcomingDates } from "./dates.js";
import { buildPayload, submitBooking } from "./api/submitBooking.js";
import ConstructionBanner from "./components/ConstructionBanner.jsx";
import Header from "./components/Header.jsx";
import StepRail from "./components/StepRail.jsx";
import Ticket from "./components/Ticket.jsx";
import NoticeModal from "./components/NoticeModal.jsx";
import StepInsurer from "./steps/StepInsurer.jsx";
import StepCompany from "./steps/StepCompany.jsx";
import StepProgram from "./steps/StepProgram.jsx";
import StepHospital from "./steps/StepHospital.jsx";
import StepForm from "./steps/StepForm.jsx";
import Done from "./steps/Done.jsx";

// Sample values so the mockup can be clicked through quickly.
const INITIAL_FORM = {
  name: "HONG GILDONG", kname: "홍길동", dob: "1968-04-12", member: "U12345678", group: "",
  phone: "", email: "gildong@example.com", kakao: "", arrive: "", leave: "", note: "", agree: false,
};
// step: 0 insurer · 1 company ID · 2 program · 3 hospital + date · 4 details · 5 done
const INITIAL_BOOKING = { step: 0, ins: null, company: null, prog: null, hosp: null, date: null };
const DONE = 5;

export default function App() {
  const { lang, t } = useLang();
  const [booking, setBooking] = useState(INITIAL_BOOKING);
  const [form, setForm] = useState(INITIAL_FORM);
  const [refCode, setRefCode] = useState(null);

  const dates = useMemo(() => upcomingDates(LEAD_DAYS), []);
  const update = (patch) => setBooking((b) => ({ ...b, ...patch }));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [booking.step]);

  const next = () => update({ step: booking.step + 1 });
  const back = () => update({ step: booking.step - 1 });

  const submit = async ({ honeypot }) => {
    const code = "CP-" + String(Math.floor(100000 + Math.random() * 900000));
    const payload = buildPayload({ booking, dates, form, refCode: code, lang });
    await submitBooking(payload, { honeypot });
    setRefCode(code);
    update({ step: DONE });
  };
  // Start a new booking but keep the verified insurer and company.
  const restart = () => {
    setBooking((b) => ({ ...INITIAL_BOOKING, ins: b.ins, company: b.company, step: 2 }));
    setRefCode(null);
  };

  const stepProps = { booking, update, dates, onNext: next, onBack: back };

  return (
    <>
      <ConstructionBanner />
      <div className="topbar">
        <div className="wrap">
          <Header />
        </div>
      </div>
      <div className="wrap">
        <p className="sample">{t("sample")}</p>
        <StepRail step={booking.step} />

        <div className="grid">
          <main aria-live="polite">
            {booking.step === 0 && <StepInsurer onPick={(ins) => update({ ins, step: 1 })} selected={booking.ins} />}
            {booking.step === 1 && <StepCompany {...stepProps} />}
            {booking.step === 2 && <StepProgram {...stepProps} />}
            {booking.step === 3 && <StepHospital {...stepProps} />}
            {booking.step === 4 && <StepForm {...stepProps} form={form} setForm={setForm} onSubmit={submit} />}
            {booking.step === DONE && <Done refCode={refCode} onRestart={restart} />}
          </main>
          <Ticket booking={booking} dates={dates} refCode={refCode} />
        </div>

        <footer>
          <span>{t("footer1")}</span>
          <span>{t("footer2")}</span>
        </footer>
      </div>
      <NoticeModal />
    </>
  );
}
