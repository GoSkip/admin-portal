import { dateFormatter } from "./data-types";

export const tableDateFormat = (v?: number | Date) => {
  const newV = dateFormatter.format(v);
  return newV;
};

export const tableTimeFormat = (v: number | Date) => {
  // returned format is `3/13 8:07am`
  if (!v) {
    return "";
  }
  const newV = new Date(v);
  const month = newV.getMonth() + 1;
  const day = newV.getDate();
  const hour = newV.getHours();
  const minute = newV.getMinutes();
  const ampm = hour >= 12 ? "pm" : "am";
  const newHour = hour % 12;
  const newMinute = minute < 10 ? `0${minute}` : minute;
  const newHourString = newHour === 0 ? "12" : newHour;
  const newVString = `${month}/${day} ${newHourString}:${newMinute}${ampm}`;
  return newVString;
};
