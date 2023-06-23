import { HeaderTypes } from "../components/data/skip-table";
import { dateFormatter } from "./data-types";

export const dynamicSort = (...props: any[]) => {
  const dynamicSortInner = (property: any) => {
    return (obj1: any[], obj2: any[]) => {
      const prop1 = obj1[property];
      const prop2 = obj2[property];
      return prop1 > prop2 ? 1 : prop1 < prop2 ? -1 : 0;
    };
  };
  return (obj1: any[], obj2: any[]) => {
    let i = 0;
    let result = 0;
    const numberOfProperties = props.length;
    while (result === 0 && i < numberOfProperties) {
      result = dynamicSortInner(props[i])(obj1, obj2);
      i++;
    }
    return result;
  };
};

export type SortFieldType = {
  key: string;
  reverse: boolean;
  primer?: Function;
};

export const advancedDynamicSort = (...props: any[]) => {
  const fields = [].slice.call(props);
  const nFields = fields.length;

  return function (A: any, B: any) {
    let a,
      b,
      field: SortFieldType,
      key,
      primer,
      reverse,
      result = 0;
    for (var i = 0, l = nFields; i < l; i++) {
      result = 0;
      field = fields[i];

      key = field.key;

      a = A[key];
      b = B[key];

      if (typeof field.primer !== "undefined") {
        a = field.primer(a);
        b = field.primer(b);
      }

      reverse = field.reverse ? -1 : 1;

      if (a < b) result = reverse * -1;
      if (a > b) result = reverse * 1;
      if (result !== 0) break;
    }
    return result;
  };
};

export type ItemWithOriginalType = {
  eq: string | string | number | Date;
  originalType: HeaderTypes;
};

export type FilterItemValueType =
  | string
  | number
  | Date
  | ItemWithOriginalType
  | { max: number; min: number };

export type FilterItemType = {
  [key: string]: FilterItemValueType;
};

export const dynamicFilter = (arr: any[], filters: FilterItemType) => {
  const fns = {
    eq:
      (key: string, value: FilterItemValueType, originalType?: string) =>
      (obj: FilterItemType) => {
        if (originalType === HeaderTypes.DATE) {
          return dateFormatter.format(obj[key] as Date) === value;
        }
        return obj[key] === value;
      },
    min: (key: string, value: FilterItemValueType) => (obj: FilterItemType) =>
      obj[key] >= value,
    max: (key: string, value: FilterItemValueType) => (obj: FilterItemType) =>
      obj[key] <= value,
  };

  const makePredicat = (
    filterKey: string,
    filterValue: FilterItemValueType
  ) => {
    const filterObj =
      typeof filterValue === "object" ? filterValue : { eq: filterValue };
    if (
      filterObj.hasOwnProperty("originalType") &&
      filterObj.hasOwnProperty("eq")
    ) {
      const obj = filterObj as ItemWithOriginalType;
      return fns.eq(filterKey, obj.eq, obj.originalType);
    }
    return Object.entries(filterObj).map(([condKey, condValue]) => {
      return fns[condKey as "eq" | "min" | "max"](filterKey, condValue);
    });
  };

  const predicats = Object.entries(filters).flatMap(([key, value]) =>
    makePredicat(key, value)
  );

  return predicats.reduce((acc, fn) => acc.filter(fn), arr);
};
