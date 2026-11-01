import { useLang } from "../i18n.jsx";

// Grid of selectable cards for insurers, programs and hospitals.
export default function OptionCards({ list, value, onSelect }) {
  const { L } = useLang();
  return (
    <div className="options">
      {list.map((o) => {
        const items = L(o.items);
        return (
          <button key={o.id} type="button" className="opt" aria-pressed={value === o.id} onClick={() => onSelect(o.id)}>
            {o.tag && <span className="tag">{L(o.tag)}</span>}
            <span className="name">{L(o.name)}</span>
            {o.meta && <span className="meta">{L(o.meta)}</span>}
            {items && (
              <ul>
                {items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            )}
            {o.price && <span className="price">{L(o.price)}</span>}
          </button>
        );
      })}
    </div>
  );
}
