import { ChevronRightIcon } from "@heroicons/react/20/solid";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export type BreadcrumbItemType = {
  label: string;
  to?: string;
  isDivider?: boolean;
};

type BreadcrumbType = {
  items: BreadcrumbItemType[];
};

export const Breadcrumb: FC<BreadcrumbType> = ({ items }) => {
  const { t } = useTranslation();
  const [internalItems, setInternalItems] = useState<BreadcrumbItemType[]>(items);

  const mapInternalItems = (items: BreadcrumbItemType[]) => {
    const arr: BreadcrumbItemType[] = [];
    items.forEach((item, index) => {
      arr.push(item);
      if (index !== items.length - 1) {
        arr.push({
          label: "",
          isDivider: true,
        });
      }
    });
    return arr;
  };

  useEffect(() => {
    const mappedItems = mapInternalItems(items);
    setInternalItems(mappedItems);
  }, [items]);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4 pb-6">
        {internalItems.map((item, index) => {
          if (item.to) {
            return (
              <li key={`${item.to}-${item.label}-link-${index}`}>
                <div>
                  <Link to={item.to} className="text-coolGray-400 hover:text-coolGray-500 text-lg font-medium">
                    {item.label}
                  </Link>
                </div>
              </li>
            );
          }
          if (item.isDivider) {
            return (
              <li key={`${item.to}-${item.label}-divider-${index}`}>
                <div>
                  <ChevronRightIcon className="h-5 w-5 text-coolGray-400" aria-hidden="true" />
                </div>
              </li>
            );
          }
          return (
            <li key={`${item.to}-${item.label}-span-${index}`}>
              <div className="flex items-center">
                <span className="text-lg font-medium">{item.label}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
