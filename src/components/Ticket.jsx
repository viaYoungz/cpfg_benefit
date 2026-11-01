import { useLang } from "../i18n.jsx";
import { HOSPITALS, INSURERS, PROGRAMS } from "../data/catalog.js";
import { kstStartIn } from "../dates.js";

function Row({ label, value }) {
  const { t } = useLang();
  return (
    <div>
      <dt>{label}</dt>
      <dd className={value ? "" : "empty"}>{value || t("empty")}</dd>
    </div>
  );
}

export default function Ticket({ booking, dates, refCode }) {
  const { t, L } = useLang();
  const ins = INSURERS.find((i) => i.id === booking.ins);
  const company = booking.company;
  const prog = PROGRAMS.find((p) => p.id === booking.prog);
  const hosp = HOSPITALS.find((h) => h.id === booking.hosp);
  const date = booking.date != null ? dates[booking.date] : null;

  // Without a chosen date, show the time for the first open date as a "day before" preview.
  const east = kstStartIn(date || dates[0], "America/New_York");
  const west = kstStartIn(date || dates[0], "America/Los_Angeles");
  const day = (x) => (date ? x.day : t("dayBefore"));
  const vals = ["08:00 KST", `${day(east)} ${east.time}`, `${day(west)} ${west.time}`, "00:00 KST"];

  return (
    <aside className="ticket" aria-label={t("ticketAria")}>
      <div className="head">
        <b>{t("ticket")}</b>
        <span>{refCode || "DRAFT"}</span>
      </div>
      <dl>
        <Row label="INSURANCE" value={ins?.name} />
        <Row label="COMPANY" value={company && L(company.name)} />
        <Row label="PROGRAM" value={prog && L(prog.name)} />
        <Row label="HOSPITAL" value={hosp && L(hosp.name)} />
        <Row label="DATE · 08:00 KST" value={date && t("fmt")(date)} />
      </dl>
      <div className="perf" />
      <div className="tz">
        {t("tzRows").map((k, i) => (
          <div key={k}>
            <span className="k">{k}</span>
            <span>{vals[i]}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
