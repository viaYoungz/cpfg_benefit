import { useLang } from "../i18n.jsx";

export default function ConstructionBanner() {
  const { t } = useLang();
  return (
    <div className="construction" role="status">
      <b>{t("cTitle")}</b>
      <span>{t("cBody")}</span>
    </div>
  );
}
