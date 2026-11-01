import { useState } from "react";
import { useLang } from "../i18n.jsx";
import { INSURERS } from "../data/catalog.js";
import { verifyCompany } from "../api/verifyCompany.js";

export default function StepCompany({ booking, update, onBack }) {
  const { t } = useLang();
  const [value, setValue] = useState(booking.company?.id || "");
  const [error, setError] = useState(null);
  const [checking, setChecking] = useState(false);
  const ins = INSURERS.find((i) => i.id === booking.ins);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checking) return;
    if (!value.trim()) return setError("errCompanyEmpty");
    setChecking(true);
    try {
      const company = await verifyCompany(value);
      if (!company) {
        setError("errCompany");
        setChecking(false);
        return;
      }
      update({ company, step: 2 });
    } catch (err) {
      console.error(err);
      setError("errCompanyNet");
      setChecking(false);
    }
  };

  return (
    <>
      <div className="chosen">
        <span className="k">{t("insurerSel")}</span>
        <b>{ins?.short}</b>
        <button type="button" className="link" onClick={onBack}>
          {t("change")} ›
        </button>
      </div>
      <h1>{t("h1")}</h1>
      <p className="lede">{t("lede1")}</p>
      <form onSubmit={handleSubmit} noValidate className="company-form">
        <div className="field">
          <label htmlFor="f-company">{t("companyId")}</label>
          <input
            id="f-company"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(null);
            }}
            placeholder={t("companyPh")}
            autoComplete="organization"
            autoCapitalize="characters"
            spellCheck={false}
            aria-invalid={!!error}
            aria-describedby="company-hint"
          />
          <span className="hint" id="company-hint">{t("companyHint")}</span>
        </div>
        {error && <p className="err" role="alert">{t(error)}</p>}
        <button type="submit" className="btn primary block" disabled={checking}>
          {t(checking ? "checking" : "verify")}
        </button>
      </form>
      <p className="help">{t("helpLine")}</p>
    </>
  );
}
