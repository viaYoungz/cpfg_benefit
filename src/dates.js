// Next 10 bookable days starting `lead` days from today, skipping Sundays.
export function upcomingDates(lead) {
  const out = [];
  const d = new Date();
  d.setDate(d.getDate() + lead);
  while (out.length < 10) {
    if (d.getDay() !== 0) out.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

// Korea checkups start at 08:00 KST (UTC+9, no DST). Returns the same instant in a
// US time zone, e.g. { day: "11/2", time: "18:00 EST" } — DST is handled by Intl.
export function kstStartIn(date, timeZone) {
  const instant = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 8 - 9));
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
      timeZoneName: "short",
    })
      .formatToParts(instant)
      .map((p) => [p.type, p.value])
  );
  return { day: `${parts.month}/${parts.day}`, time: `${parts.hour}:${parts.minute} ${parts.timeZoneName}` };
}
