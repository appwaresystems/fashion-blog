export function formatDate(date) {
  if (!date) {
    return "";
  }

  const parsed = new Date(`${String(date).slice(0, 10)}T12:00:00Z`);

  if (Number.isNaN(parsed.getTime())) {
    return String(date);
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

export function formatShortDate(date) {
  if (!date) {
    return "";
  }

  const parsed = new Date(`${String(date).slice(0, 10)}T12:00:00Z`);

  if (Number.isNaN(parsed.getTime())) {
    return String(date);
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
