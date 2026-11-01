import { useLang } from "../i18n.jsx";
import { INSURERS } from "../data/catalog.js";

// Landing step: picking an insurer goes straight to Company ID verification.
export default function StepInsurer({ selected, onPick }) {
  const { t, L } = useLang();
  return (
    <>
      <h1>{t("h0")}</h1>
      <p className="lede">{t("lede0")}</p>
      <ul className="trust">
        {t("trust").map(([bold, rest]) => (
          <li key={bold}>
            <span>
              <b>{bold}</b>
              {rest}
            </span>
          </li>
        ))}
      </ul>
      <div className="label-row">
        <p className="label">{t("insurer")}</p>
        <span className="count">{t("providers")(INSURERS.length)}</span>
      </div>
      <div className="options">
        {INSURERS.map((o) => (
          <button key={o.id} type="button" className="opt insurer" aria-pressed={selected === o.id} onClick={() => onPick(o.id)}>
            <span className="short">{o.short}</span>
            <span className="name">{o.name}</span>
            <span className="meta">{L(o.meta)}</span>
            <span className="go">{t("go")} →</span>
          </button>
        ))}
      </div>
    </>
  );
}
