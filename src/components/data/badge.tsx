import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import React, { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

export const Badge: FC<{
  label?: ReactNode;
  value?: string;
  sortBadge?: boolean;
  color?: string;
  onRemove?: (v: string) => void;
}> = ({ label, value, color = "gray", sortBadge = false, onRemove }) => {
  const { t } = useTranslation();
  const isDesc = value?.startsWith("-");
  const handleRemove = () => {
    if (onRemove && value) {
      onRemove(value);
    }
  };
  return (
    <span
      className={`inline-flex items-center gap-x-2 rounded-md bg-${color}-100 px-2 py-1 text-xs font-medium text-${color}-600`}
    >
      <span className="flex items-center gap-1">
        {sortBadge && (
          <>
            {isDesc ? (
              <ArrowDownIcon className="h-2.5 w-2.5"></ArrowDownIcon>
            ) : (
              <ArrowUpIcon className="h-2.5 w-2.5"></ArrowUpIcon>
            )}
          </>
        )}
        {label}
      </span>
      <button
        type="button"
        className={`group relative -mr-1 h-3.5 w-3.5 rounded-sm transition hover:bg-${color}-500/20`}
        onClick={handleRemove}
      >
        <span className="sr-only">{t("remove")}</span>
        <svg viewBox="0 0 14 14" className={`h-3.5 w-3.5 stroke-${color}-400 group-hover:stroke-${color}-700/75`}>
          <path d="M4 4l6 6m0-6l-6 6" />
        </svg>
        <span className="absolute -inset-1" />
      </button>
    </span>
  );
};
