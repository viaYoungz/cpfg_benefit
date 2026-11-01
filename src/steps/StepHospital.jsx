import { useLang } from "../i18n.jsx";
import { FULL_DATES, HOSPITALS } from "../data/catalog.js";
import OptionCards from "../components/OptionCards.jsx";
import StepNav from "../components/StepNav.jsx";

export default function StepHospital({ booking, update, dates, onNext, onBack }) {
  const { t } = useLang();
  return (
    <>
      <h1>{t("h3")}</h1>
      <p className="lede">{t("lede3")}</p>
      <p className="label">{t("hosp")}</p>
      <OptionCards list={HOSPITALS} value={booking.hosp} onSelect={(hosp) => update({ hosp })} />
      <p className="label">{t("dateLbl")}</p>
      <div className="dates">
        {dates.map((d, i) => {
          const full = FULL_DATES.has(i);
          return (
            <button
              key={d.toDateString()}
              type="button"
              className="date"
              aria-pressed={booking.date === i}
              disabled={full}
              aria-label={full ? `${t("fmt")(d)} ${t("full")}` : undefined}
              onClick={() => update({ date: i })}
            >
              <small>{t("weekday")(d)}</small>
              <b>
                {d.getMonth() + 1}/{d.getDate()}
              </b>
            </button>
          );
        })}
      </div>
      <StepNav onBack={onBack} onNext={onNext} canNext={!!booking.hosp && booking.date != null} />
    </>
  );
}
