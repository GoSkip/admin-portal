import classNames from "classnames";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
type SecondaryButtonProps = {
  label: ReactNode;
  additionalClasses?: string;
  disabled?: boolean;
  to?: string;
  onClick?: () => any;
};

const SecondaryButton = ({
  label,
  additionalClasses,
  disabled,
  to,
  onClick,
}: SecondaryButtonProps): JSX.Element => {
  let _onClick = () => {};

  if (onClick) {
    _onClick = onClick;
  }

  const initClasses = [
    "inline-flex gap-2 items-center justify-center",
    "rounded-md border border-transparent",
    "text-sm font-medium text-gray-900",
    "px-4 py-2 transition-all",
    "ring-1 ring-gray-300",
    disabled
      ? "bg-gray-300 text-white"
      : "bg-white shadow-sm hover:bg-gray-100",
  ].join(" ");

  if (to && !disabled) {
    return (
      <Link
        to={to}
        type="button"
        aria-disabled={disabled}
        onClick={_onClick}
        className={`${initClasses} ${additionalClasses}`}
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={_onClick}
      className={`${initClasses} ${additionalClasses}`}
    >
      {label}
    </button>
  );
};

export default SecondaryButton;
