import React, { FC, useLayoutEffect, useRef, useState } from "react";
import { IconButton } from "../buttons/icon";
import {
  TableFilterDropdown,
  TableFilterDropdownItemType,
} from "../inputs/tableFilterDropdown";
import { mdiMenuDown, mdiMenuUp } from "@mdi/js";
import { dateFormatter } from "../../utils/data-types";
// @ts-ignore
import { set } from "lodash";
import {
  FilterItemValueType,
  SortFieldType,
  advancedDynamicSort,
  dynamicFilter,
  dynamicSort,
} from "../../utils/array-sort-filter";

export enum HeaderTypes {
  STRING = "string",
  NUMBER = "number",
  DATE = "date",
  BOOLEAN = "boolean",
}

export enum SortDirection {
  DESC = 1,
  ASC = -1,
}

export type TableHeaderType = {
  label: string;
  value: string;
  type?: HeaderTypes;
  itemCustomClass?: string;
  itemCustomFormatter?: FC<{ item: any }>;
};

type SkipTableType = {
  items: any[];
  itemKey: string;
  headers: TableHeaderType[];
  isLoading?: boolean;
  selectable?: boolean;
  filterOnServer?: boolean;
  sortOnServer?: boolean;
  onFilter?: () => void;
  onSort?: () => void;
  onSelectedChange?: () => void;
  onItemClick?: (item: any) => void;
};

type SortItemType = {
  key: string;
  direction: SortDirection;
};

type FilterItemType = {
  key: string;
  value: string | number | Date;
  originalType: HeaderTypes;
};

type MappedFilterItemType = {
  [key: string]: FilterItemValueType;
};

const mapFilters = (arr: FilterItemType[]) => {
  const obj: MappedFilterItemType = {};
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    obj[item.key] = {
      eq: item.value,
      originalType: item.originalType,
    };
  }
  return obj;
};

export const SkipTable: FC<SkipTableType> = ({
  items,
  itemKey,
  isLoading,
  selectable,
  headers,
  filterOnServer,
  sortOnServer,
  onFilter,
  onSort,
  onSelectedChange,
  onItemClick,
}) => {
  const checkbox = useRef<HTMLInputElement | null>();
  const [checked, setChecked] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [indeterminate, setIndeterminate] = useState<boolean>(false);
  const [sorts, setSorts] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterItemType[]>([]);
  const [mappedSorts, setMappedSorts] = useState<SortFieldType[]>([]);
  // const [mappedFilters, setMappedFilters] = useState<MappedFilterItemType>({});
  const [filteredItems, setFilteredItems] = useState<any[]>(items);
  const [sortedItems, setSortedItems] = useState<any[]>(filteredItems);

  const getMappedSorts = (sorts: string[]) => {
    const mappedSorts: SortFieldType[] = sorts
      .filter((key) => {
        const pureKey = key.replace("-", "");
        const header = headers.find((h) => h.value === pureKey);
        if (header) {
          return true;
        }
        return false;
      })
      .map((key) => {
        const isReversed = key.includes("-");
        const pureKey = key.replace("-", "");
        const header = headers.find((h) => h.value === pureKey);
        let primer = undefined;
        if (header?.type === HeaderTypes.NUMBER) {
          primer = parseInt;
        }
        return {
          key: pureKey,
          reverse: isReversed,
          primer,
        };
      });
    return mappedSorts;
  };

  const updateSorts = (v: string) => {
    const sortsCopy = [...sorts];
    const iASC = sortsCopy.indexOf(v);
    const iDESC = sortsCopy.indexOf(`-${v}`);
    if (iASC >= 0) {
      sortsCopy[iASC] = `-${v}`;
      setSorts(sortsCopy);
      const newMappedSorts = getMappedSorts(sortsCopy);
      setMappedSorts(newMappedSorts);
      return;
    }
    if (iDESC >= 0) {
      sortsCopy.splice(iDESC, 1);
      setSorts(sortsCopy);
      const newMappedSorts = getMappedSorts(sortsCopy);
      setMappedSorts(newMappedSorts);
      return;
    }
    sortsCopy.push(v);
    setSorts(sortsCopy);
    const newMappedSorts = getMappedSorts(sortsCopy);
    setMappedSorts(newMappedSorts);
  };

  const checkHeaderInSort = (v: string) => {
    if (sorts.includes(v)) {
      return 1;
    }
    if (sorts.includes(`-${v}`)) {
      return -1;
    }
    return 0;
  };

  const updateFilters = (key: string, v: string | number | Date | null) => {
    if (!!v || v === 0) {
      const header = headers.find((h) => h.value === key);
      const filterIndex = filters.findIndex((f) => f.key === key);
      let newFilters = [];
      if (filterIndex >= 0) {
        newFilters = [...filters];
        newFilters[filterIndex].value = v;
      } else {
        const newFilter = {
          key,
          value: v,
          originalType: header?.type || HeaderTypes.STRING,
        };
        newFilters = [...filters, newFilter];
      }
      setFilters(newFilters);
      const newMappedFilters = mapFilters(newFilters);
      // setMappedFilters(newMappedFilters);
      const itemsCopy = [...items];
      const newFilteredItems: any[] = dynamicFilter(
        itemsCopy,
        newMappedFilters
      );
      setFilteredItems(newFilteredItems);
    }
  };

  const toggleAll = () => {
    setSelectedItems(
      checked || indeterminate ? [] : sortedItems.map((f) => f.id)
    );
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  };

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedItems.length > 0 && selectedItems.length < sortedItems.length;
    setChecked(
      selectedItems.length === sortedItems.length && sortedItems.length > 0
    );
    setIndeterminate(isIndeterminate);
    set(checkbox, "current.indeterminate", isIndeterminate);
  }, [selectedItems, sortedItems]);

  useLayoutEffect(() => {
    const newMappedFilters = mapFilters(filters);
    const itemsCopy = [...items];
    const newFilteredItems: any[] = dynamicFilter(itemsCopy, newMappedFilters);
    setFilteredItems(newFilteredItems);
  }, [items]);

  useLayoutEffect(() => {
    const newSortedItems: any[] = filteredItems.sort(
      advancedDynamicSort(...mappedSorts)
    );
    setSortedItems(newSortedItems);
  }, [filteredItems]);

  return (
    <div className="mt-5 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full pt-2 pb-4 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg mb-2 min-h-[400px] bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {selectable && (
                    <th
                      scope="col"
                      className="relative w-12 px-6 sm:w-16 sm:px-8"
                    >
                      <input
                        disabled={sortedItems.length === 0}
                        type="checkbox"
                        className={`${
                          !checked && "opacity-70"
                        } absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-lightBlue-600 focus:ring-lightBlue-500 sm:left-6`}
                        ref={checkbox as any}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
                  )}
                  {headers.map((header, i) => {
                    const key = header.value;
                    const headerInSort = checkHeaderInSort(key);
                    const filterOptions: TableFilterDropdownItemType[] =
                      items.map((item) => {
                        let itemValue = item[key];
                        if (header.type === HeaderTypes.DATE) {
                          itemValue = dateFormatter.format(itemValue);
                        }
                        return {
                          label: itemValue,
                          value: itemValue,
                        };
                      });
                    return (
                      <th
                        key={`header-${i}-${key}`}
                        scope="col"
                        className="py-2 pl-4 pr-3 text-left text-xs font-medium text-gray-500 sm:pl-6 tracking-wider"
                      >
                        <div
                          className="flex uppercase justify-between items-center select-none cursor-pointer"
                          onClick={() => {
                            updateSorts(key);
                          }}
                        >
                          {header.label}
                          <div className="flex justify-center items-center gap-2">
                            <IconButton
                              icon={mdiMenuDown}
                              color={
                                headerInSort !== 0
                                  ? "lightBlue-500"
                                  : "gray-200"
                              }
                              colorHover={headerInSort !== 0 ? "" : "gray-500"}
                              size={0}
                              customClasses={
                                headerInSort === 1 ? "transform rotate-180" : ""
                              }
                            ></IconButton>
                            <TableFilterDropdown
                              label={header.label}
                              items={filterOptions}
                              onChange={(e) => updateFilters(header.value, e)}
                            ></TableFilterDropdown>
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody
                className={`divide-y divide-gray-200 bg-white ${
                  isLoading ? "blur-sm" : null
                }`}
              >
                {sortedItems.map((item) => {
                  const selectableKey = item[itemKey];
                  return (
                    <tr
                      key={selectableKey}
                      className={
                        selectedItems.includes(selectableKey)
                          ? "bg-gray-50"
                          : undefined
                      }
                    >
                      {selectable && (
                        <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                          {selectedItems.includes(selectableKey) && (
                            <div className="absolute inset-y-0 left-0 w-0.5 bg-lightBlue-600" />
                          )}
                          <input
                            type="checkbox"
                            className={`${
                              !selectedItems.includes(selectableKey) &&
                              "opacity-70"
                            } absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-lightBlue-600 focus:ring-lightBlue-500 sm:left-6`}
                            value={selectableKey}
                            checked={selectedItems.includes(selectableKey)}
                            onChange={(e) =>
                              setSelectedItems(
                                e.target.checked
                                  ? [...selectedItems, selectableKey]
                                  : selectedItems.filter(
                                      (k) => k !== selectableKey
                                    )
                              )
                            }
                          />
                        </td>
                      )}
                      {headers.map((header, i) => {
                        const value = item[header.value];
                        return (
                          <td
                            key={`item-${i}-${header.value}`}
                            className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 ${
                              onItemClick ? "cursor-pointer" : ""
                            } ${header.itemCustomClass}`}
                            onClick={() => {
                              if (item[itemKey] && onItemClick) {
                                onItemClick(item);
                              }
                            }}
                          >
                            {header.itemCustomFormatter
                              ? header.itemCustomFormatter({ item })
                              : header.type === HeaderTypes.DATE
                              ? dateFormatter.format(value)
                              : value}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
