import { useState } from "react";
import { useLang } from "../i18n.jsx";
import Rings from "./Rings.jsx";

const todayKey = () => "cpfg-notice2-" + new Date().toDateString();

function hiddenToday() {
  try {
    return localStorage.getItem(todayKey()) === "1";
  } catch (_) {
    return false;
  }
}

export default function NoticeModal() {
  const { t } = useLang();
  const [open, setOpen] = useState(() => !hiddenToday());
  if (!open) return null;

  const hideToday = () => {
    try {
      localStorage.setItem(todayKey(), "1");
    } catch (_) {}
    setOpen(false);
  };

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="notice-title">
      <div className="modal-card">
        <div className="band">
          <Rings />
          <h2 id="notice-title">{t("nTitle")}</h2>
        </div>
        <div className="body">
          <p className="pop-cons">
            <b>{t("cTitle")}</b>
            <span>{t("cBody")}</span>
          </p>
          <p className="lead">{t("nLead")}</p>
          <ul>
            {t("nItems").map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="foot">
          <button type="button" onClick={hideToday}>{t("nToday")}</button>
          <button type="button" onClick={() => setOpen(false)}>{t("nClose")}</button>
        </div>
      </div>
    </div>
  );
}
