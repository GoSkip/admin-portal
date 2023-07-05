import { ReactNode } from "react";
import { Link } from "react-router-dom";

type PrimaryButtonProps = {
  label: ReactNode;
  additionalClasses?: string;
  disabled?: boolean;
  to?: string;
  onClick?: () => any;
};

const PrimaryButton = ({ label, additionalClasses, disabled, to, onClick }: PrimaryButtonProps): JSX.Element => {
  let _onClick = () => {};

  if (onClick) {
    _onClick = onClick;
  }

  const initClasses = [
    "inline-flex gap-2 items-center justify-center",
    "rounded-md border border-transparent",
    "text-sm font-medium text-white",
    "px-4 py-2 transition-all",
    "focus:outline-none",
    disabled ? "bg-gray-300 text-white" : "bg-lightBlue-700 shadow-sm hover:bg-lightBlue-900",
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
    <button type="button" disabled={disabled} onClick={_onClick} className={`${initClasses} ${additionalClasses}`}>
      {label}
    </button>
  );
};

export default PrimaryButton;
