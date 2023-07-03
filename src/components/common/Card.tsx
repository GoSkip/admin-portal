import React, { FC, ReactNode } from "react";

export const Card: FC<{ children: ReactNode; className: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`bg-white ring-1 ring-gray-900/5 rounded-xl shadow ${className}`}
    >
      {children}
    </div>
  );
};
