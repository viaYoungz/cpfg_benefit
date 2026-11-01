import { useState } from "react";
import { useLang } from "../i18n.jsx";
import StepNav from "../components/StepNav.jsx";

const REQUIRED = ["name", "dob", "member", "email"];

export default function StepForm({ form, setForm, onBack, onSubmit }) {
  const { t } = useLang();
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const set = (key) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: v }));
  };

  // Text input bound to form[key].
  const field = (key, label, { hint, ...attrs } = {}) => (
    <div className="field">
      <label htmlFor={`f-${key}`}>{label}</label>
      <input id={`f-${key}`} value={form[key]} onChange={set(key)} {...attrs} />
      {hint && <span className="hint">{hint}</span>}
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    const missing = REQUIRED.find((k) => !String(form[k]).trim());
    if (missing) {
      setError("errReq");
      document.getElementById(`f-${missing}`)?.focus();
      return;
    }
    if (!form.agree) {
      setError("errAgree");
      return;
    }
    setError(null);
    setSending(true);
    try {
      await onSubmit({ honeypot });
    } catch (err) {
      console.error(err);
      setError("errSend");
      setSending(false);
    }
  };

  return (
    <>
      <h1>{t("h4")}</h1>
      <p className="lede">{t("formLede")}</p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          {field("name", t("fName"), { required: true, placeholder: "HONG GILDONG" })}
          {field("kname", t("fKname"), { placeholder: "홍길동" })}
        </div>
        <div className="row">
          {field("dob", t("fDob"), { type: "date", required: true })}
          {field("member", t("fMember"), { required: true, placeholder: t("fMemberPh"), hint: t("sampleVal") })}
        </div>
        <div className="row">
          {field("group", t("fGroup"), { placeholder: t("fGroupPh") })}
          {field("phone", t("fPhone"), { type: "tel", placeholder: "(000) 000-0000" })}
        </div>
        <div className="row">
          {field("email", t("fEmail"), { type: "email", required: true })}
          {field("kakao", t("fKakao"), { placeholder: "cpfg_member" })}
        </div>

        <div className="row">
          {field("arrive", t("fArrive"), { type: "date" })}
          {field("leave", t("fLeave"), { type: "date", hint: t("fLeaveHint") })}
        </div>

        <div className="field">
          <label htmlFor="f-note">{t("fNote")}</label>
          <textarea id="f-note" rows={3} placeholder={t("fNotePh")} value={form.note} onChange={set("note")} />
        </div>
        <label className="check">
          <input type="checkbox" checked={form.agree} onChange={set("agree")} /> {t("agree")}
        </label>
        {/* Spam trap: hidden from people, bots tend to fill it. */}
        <input
          type="text"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          hidden
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
        {error && <p className="err" role="alert">{t(error)}</p>}
        <StepNav onBack={sending ? null : onBack} submit canNext={!sending} nextLabel={t(sending ? "sending" : "submit")} />
      </form>
    </>
  );
}
