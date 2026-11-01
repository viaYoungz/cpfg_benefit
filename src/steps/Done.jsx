import { useLang } from "../i18n.jsx";
import { isLive } from "../api/submitBooking.js";

export default function Done({ refCode, onRestart }) {
  const { t } = useLang();
  return (
    <div className="done-box">
      <p className="label first">{t("refLbl")}</p>
      <p className="ref">{refCode}</p>
      <h1>{t("doneH")}</h1>
      <p className="lede" style={{ marginBottom: 0 }}>{t("doneLede")}</p>
      <ol>
        {t("doneSteps").map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ol>
      {!isLive && <p className="hint" style={{ marginTop: 16 }}>{t("doneNote")}</p>}
      <div className="nav">
        <span />
        <button type="button" className="btn ghost" onClick={onRestart}>
          {t("restart")}
        </button>
      </div>
    </div>
  );
}
