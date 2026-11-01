import { useLang } from "../i18n.jsx";

export default function StepRail({ step }) {
  const { t } = useLang();
  return (
    <ol className="rail">
      {t("rail").map((label, i) => (
        <li key={i} className={i < step ? "done" : i === step ? "now" : ""}>
          <small>STEP {i + 1}</small>
          <span>{label}</span>
        </li>
      ))}
    </ol>
  );
}
