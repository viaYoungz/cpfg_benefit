import { useLang } from "../i18n.jsx";

// Back / next buttons. With `submit`, the primary button submits the enclosing form.
export default function StepNav({ onBack, onNext, canNext = true, nextLabel, submit = false }) {
  const { t } = useLang();
  return (
    <div className="nav">
      {onBack ? (
        <button type="button" className="btn ghost" onClick={onBack}>
          {t("prev")}
        </button>
      ) : (
        <span />
      )}
      <button
        type={submit ? "submit" : "button"}
        className="btn primary"
        disabled={!canNext}
        onClick={submit ? undefined : onNext}
      >
        {nextLabel || t("next")}
      </button>
    </div>
  );
}
