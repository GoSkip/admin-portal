import React, { FC, useLayoutEffect, useRef, useState } from "react";
import { IconButton } from "@components/buttons/icon";
import { TableFilterDropdown, TableFilterDropdownItemType } from "@components/inputs/tableFilterDropdown";
import { mdiMenuDown, mdiMenuUp } from "@mdi/js";
import { dateFormatter } from "@utils/data-types";
// @ts-ignore
import { set } from "lodash";
import {
  FilterItemValueType,
  SortFieldType,
  advancedDynamicSort,
  dynamicFilter,
  dynamicSort,
} from "@utils/array-sort-filter";
import HeadingMd from "../typography/headingMd";
import Dropdown, { DropdownItemType } from "../dropdown";
import PrimaryButton from "../buttons/primary";
import { SkipTableSorts } from "@components/inputs/skip-table-sorts";
import { useTranslation } from "react-i18next";
import { Badge } from "./badge";
import { SkipTableFilters } from "../inputs/skip-table-filters";
import { tableTimeFormat } from "@/utils/date-time-formats";

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
  title?: string;
  isLoading?: boolean;
  selectable?: boolean;
  filterOnServer?: boolean;
  sortOnServer?: boolean;
  headAppend?: JSX.Element;
  actions?: DropdownItemType[];
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
  title,
  items,
  itemKey,
  isLoading,
  selectable,
  headers,
  filterOnServer,
  sortOnServer,
  headAppend,
  actions,
  onFilter,
  onSort,
  onSelectedChange,
  onItemClick,
}) => {
  const { t } = useTranslation();
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
      .filter(key => {
        const pureKey = key.replace("-", "");
        const header = headers.find(h => h.value === pureKey);
        if (header) {
          return true;
        }
        return false;
      })
      .map(key => {
        const isReversed = key.includes("-");
        const pureKey = key.replace("-", "");
        const header = headers.find(h => h.value === pureKey);
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

  const updateSortsV2 = (key: string, v: number) => {
    const sortsCopy = [...sorts];
    const iASC = sortsCopy.indexOf(key);
    const iDESC = sortsCopy.indexOf(`-${key}`);
    const i = iASC >= 0 ? iASC : iDESC;
    if (i >= 0) {
      // no need to push, just update or delete
      if (v === 1) {
        sortsCopy[i] = key;
      }
      if (v === -1) {
        sortsCopy[i] = `-${key}`;
      }
      if (v === 0) {
        sortsCopy.splice(i, 1);
      }
    } else {
      // push
      if (v === 1) {
        sortsCopy.push(key);
      }
      if (v === -1) {
        sortsCopy.push(`-${key}`);
      }
    }
    setSorts(sortsCopy);
    const newMappedSorts = getMappedSorts(sortsCopy);
    setMappedSorts(newMappedSorts);
    return;
  };

  const handleSortRemoval = (key: string) => {
    const k = key.replace("-", "");
    updateSortsV2(k, 0);
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
      const header = headers.find(h => h.value === key);
      const filterIndex = filters.findIndex(f => f.key === key);
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
      const newFilteredItems: any[] = dynamicFilter(itemsCopy, newMappedFilters);
      setFilteredItems(newFilteredItems);
    }
  };

  const toggleAll = () => {
    setSelectedItems(checked || indeterminate ? [] : sortedItems.map(f => f.id));
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  };

  useLayoutEffect(() => {
    const isIndeterminate = selectedItems.length > 0 && selectedItems.length < sortedItems.length;
    setChecked(selectedItems.length === sortedItems.length && sortedItems.length > 0);
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
    const newSortedItems: any[] = filteredItems.sort(advancedDynamicSort(...mappedSorts));
    setSortedItems(newSortedItems);
  }, [filteredItems]);

  return (
    <div>
      {(title || headAppend || (actions && actions.length > 0)) && (
        <div>
          <div className="flex h-20 -mt-4 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">{title && <HeadingMd label={title}></HeadingMd>}</div>
            </div>
            <div>
              <div className="sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <SkipTableFilters
                    value={sorts}
                    items={headers}
                    disabled={isLoading}
                    onChange={updateSortsV2}
                  ></SkipTableFilters>
                  <SkipTableSorts
                    value={sorts}
                    items={headers}
                    disabled={isLoading}
                    onChange={updateSortsV2}
                  ></SkipTableSorts>
                  {actions && actions.length > 0 && (
                    <Dropdown disabled={selectedItems.length === 0} items={actions} label="Actions"></Dropdown>
                  )}
                  {headAppend && headAppend}
                </div>
              </div>
            </div>
          </div>
          <hr />
          {(sorts.length > 0 || filters.length > 0) && (
            <div className="my-2.5 flex flex-wrap justify-end items-center gap-8">
              {filters.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-coolGray-800">{t("filter")}</span>
                  <div className="flex items-center gap-1">
                    {/* Loop through `filters` */}
                    {filters.map((s, i) => {
                      return (
                        <Badge key={`${s}-${i}`} label={s.key} color="lightBlue" onRemove={handleSortRemoval}></Badge>
                      );
                    })}
                  </div>
                </div>
              )}
              {sorts.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-coolGray-800">{t("sort")}</span>
                  <div className="flex items-center gap-1">
                    {/* Loop through `sorts` */}
                    {sorts.map((s, i) => {
                      const v = s.replace("-", "");
                      const label = headers.find(h => h.value === v)?.label;
                      return (
                        <Badge
                          key={`${s}-${i}`}
                          label={label}
                          value={s}
                          color="lightBlue"
                          sortBadge
                          onRemove={handleSortRemoval}
                        ></Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <div className={`${sorts.length > 0 ? "" : "mt-5"} flow-root`}>
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full pt-2 pb-4 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg mb-2 min-h-[400px] bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {selectable && (
                      <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
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
                      {
                        /* 
                          TODO: Delete the below commented code once @peter approves the new design of filters/sorts
                        */
                      }
                      // const headerInSort = checkHeaderInSort(key);
                      // const filterOptions: TableFilterDropdownItemType[] = items.map(item => {
                      //   let itemValue = item[key];
                      //   if (header.type === HeaderTypes.DATE) {
                      //     itemValue = tableTimeFormat(itemValue);
                      //   }
                      //   return {
                      //     label: itemValue,
                      //     value: itemValue,
                      //   };
                      // });
                      return (
                        <th
                          key={`header-${i}-${key}`}
                          scope="col"
                          className="py-3 pl-4 pr-3 text-left text-xs font-medium text-gray-500 sm:pl-6 tracking-wider"
                        >
                          <div
                            className="flex uppercase justify-between items-center select-none"
                            onClick={() => {
                              updateSorts(key);
                            }}
                          >
                            {header.label}
                            {/* 
                              TODO: Delete the below commented code once @peter approves the new design of filters/sorts
                            */}
                            {/* <div className="flex justify-center items-center gap-2">
                              <IconButton
                                icon={mdiMenuDown}
                                color={headerInSort !== 0 ? "lightBlue-500" : "gray-200"}
                                colorHover={headerInSort !== 0 ? "" : "gray-500"}
                                size={0}
                                customClasses={headerInSort === 1 ? "transform rotate-180" : ""}
                              ></IconButton>
                              <TableFilterDropdown
                                label={header.label}
                                items={filterOptions}
                                onChange={e => updateFilters(header.value, e)}
                              ></TableFilterDropdown>
                            </div> */}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className={`divide-y divide-gray-200 bg-white ${isLoading ? "blur-sm" : null}`}>
                  {sortedItems.map(item => {
                    const selectableKey = item[itemKey];
                    return (
                      <tr
                        key={selectableKey}
                        className={selectedItems.includes(selectableKey) ? "bg-gray-50" : undefined}
                      >
                        {selectable && (
                          <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                            {selectedItems.includes(selectableKey) && (
                              <div className="absolute inset-y-0 left-0 w-0.5 bg-lightBlue-600" />
                            )}
                            <input
                              type="checkbox"
                              className={`${
                                !selectedItems.includes(selectableKey) && "opacity-70"
                              } absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-lightBlue-600 focus:ring-lightBlue-500 sm:left-6`}
                              value={selectableKey}
                              checked={selectedItems.includes(selectableKey)}
                              onChange={e =>
                                setSelectedItems(
                                  e.target.checked
                                    ? [...selectedItems, selectableKey]
                                    : selectedItems.filter(k => k !== selectableKey)
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
                                ? tableTimeFormat(value)
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
    </div>
  );
};
