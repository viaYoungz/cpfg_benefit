import { useLang } from "../i18n.jsx";
import { PROGRAMS } from "../data/catalog.js";
import OptionCards from "../components/OptionCards.jsx";
import StepNav from "../components/StepNav.jsx";

export default function StepProgram({ booking, update, onNext, onBack }) {
  const { t } = useLang();
  return (
    <>
      <h1>{t("h2")}</h1>
      <p className="lede">{t("lede2")}</p>
      <OptionCards list={PROGRAMS} value={booking.prog} onSelect={(prog) => update({ prog })} />
      <StepNav onBack={onBack} onNext={onNext} canNext={!!booking.prog} />
    </>
  );
}
