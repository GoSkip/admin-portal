function formatMinsHours(mins: number): string {
  if (mins < 60) {
    return `${mins} mins`;
  }

  if (mins === 60) {
    return `1 hr`;
  }

  if (mins >= 60 && mins % 60 === 0) {
    return `${mins / 60} hrs`;
  }

  const hour = Math.floor(mins / 60);
  const min = mins % 60;

  return `${hour} hr${hour > 1 ? "s" : ""} ${min} min${min > 1 ? "s" : ""}`;
}

export default formatMinsHours;
