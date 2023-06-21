export type ObjectOfStrings = {
  [key: string]: string | number | null | undefined;
};

type uniqueArrayByKeyType = (
  itmes: ObjectOfStrings[],
  key: string
) => ObjectOfStrings[];

export const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "numeric",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
  timeZone: "America/Chicago",
});

export const uniqueArrayByKey: uniqueArrayByKeyType = (
  items = [],
  key = ""
) => {
  const map = new Map();
  for (const item of items) {
    map.set(item[key], item);
  }
  const iteratorValues = map.values();
  const uniqueItems = [...iteratorValues];
  return uniqueItems;
};
