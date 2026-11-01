import { useLang } from "../i18n.jsx";
import Rings from "./Rings.jsx";

const LANGS = [
  ["ko", "한국어"],
  ["en", "EN"],
];

export default function Header() {
  const { lang, setLang, t } = useLang();
  return (
    <header className="top">
      <a className="brand" href="#" aria-label={t("homeAria")}>
        <Rings />
        <span className="word">
          <b>CPFG</b>
          <small>BENEFIT</small>
        </span>
      </a>
      <div className="lang" role="group" aria-label="Language">
        {LANGS.map(([code, label]) => (
          <button key={code} type="button" aria-pressed={lang === code} onClick={() => setLang(code)}>
            {label}
          </button>
        ))}
      </div>
    </header>
  );
}
