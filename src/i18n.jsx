import { createContext, useContext, useEffect, useState } from "react";
import { STRINGS } from "./data/strings.js";

const LangContext = createContext(null);

// Every visit opens in Korean; EN is a per-visit toggle and is not remembered.
export function LangProvider({ children }) {
  const [lang, setLang] = useState("ko");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key) => STRINGS[lang][key];
  // Pick the current language from a {ko, en} value; plain values pass through.
  const L = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] : v);

  return <LangContext.Provider value={{ lang, setLang, t, L }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
