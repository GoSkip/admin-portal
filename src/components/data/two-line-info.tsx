import React, { FC, ReactNode } from "react";

type TwoLineInfoProps = {
  label: ReactNode;
  value: ReactNode;
  labelColor?: string;
  valueColor?: string;
  className?: string;
};

export const TwoLineInfo: FC<TwoLineInfoProps> = ({
  label,
  value,
  labelColor = "coolGray-500",
  valueColor = "coolGray-900",
  className,
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span className={`block text-sm font-medium text-${labelColor}`}>
        {label}
      </span>
      <span className={`block text-sm text-${valueColor}`}>{value}</span>
    </div>
  );
};
