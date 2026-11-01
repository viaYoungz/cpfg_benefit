import { HOSPITALS, INSURERS, PROGRAMS } from "../data/catalog.js";

// Where requests go, set in .env (see .env.example):
//   VITE_WEB3FORMS_KEY     → emailed to you via Web3Forms
//   VITE_BOOKING_ENDPOINT  → JSON POSTed to your own URL (Apps Script, serverless function, …)
// With neither set, submissions are not sent anywhere (mockup mode).
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const ENDPOINT = import.meta.env.VITE_BOOKING_ENDPOINT;

export const isLive = Boolean(WEB3FORMS_KEY || ENDPOINT);

const iso = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// Flat, coordinator-readable record. Option names are sent in Korean, the working language.
export function buildPayload({ booking, dates, form, refCode, lang }) {
  const prog = PROGRAMS.find((p) => p.id === booking.prog);
  const hosp = HOSPITALS.find((h) => h.id === booking.hosp);
  const ins = INSURERS.find((i) => i.id === booking.ins);
  const company = booking.company; // { id, name } as returned by the server check

  return {
    ref: refCode,
    insurer: ins?.name,
    company_id: company?.id,
    company: company?.name.ko,
    program: prog?.name.ko,
    hospital: hosp?.name.ko,
    date: booking.date != null ? iso(dates[booking.date]) : "",
    name_en: form.name.trim(),
    name_ko: form.kname.trim(),
    dob: form.dob,
    member_id: form.member.trim(),
    group_no: form.group.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    kakao: form.kakao.trim(),
    arrive_korea: form.arrive,
    leave_korea: form.leave,
    note: form.note.trim(),
    consent: form.agree ? "yes" : "no",
    site_language: lang,
    submitted_at: new Date().toISOString(),
  };
}

export async function submitBooking(payload, { honeypot = "" } = {}) {
  if (!isLive) {
    await new Promise((r) => setTimeout(r, 400));
    return;
  }

  let res;
  if (WEB3FORMS_KEY) {
    res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `[CPFG 예약 신청] ${payload.ref} · ${payload.name_en} · ${payload.company}`,
        from_name: "CPFG Benefit",
        replyto: payload.email,
        botcheck: honeypot,
        ...payload,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) throw new Error(data.message || `Web3Forms ${res.status}`);
    return;
  }

  // text/plain keeps this a "simple" CORS request, which Google Apps Script web apps require.
  res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Booking endpoint ${res.status}`);
}
