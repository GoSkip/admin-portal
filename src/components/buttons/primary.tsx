type PrimaryButtonProps = {
  label: string;
  additionalClasses?: string;
  disabled?: boolean;
  onClick?: () => any;
};

const PrimaryButton = ({
  label,
  additionalClasses,
  disabled,
  onClick,
}: PrimaryButtonProps): JSX.Element => {
  let _onClick = () => {};

  if (onClick) {
    _onClick = onClick;
  }

  const initClasses = [
    "inline-flex items-center justify-center",
    "rounded-md border border-transparent",
    "text-sm font-medium text-white",
    "px-4 py-2 transition-all",
    "bg-lightBlue-700 shadow-sm",
    "hover:bg-blue-700",
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    "sm:w-auto",
  ].join(" ");

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

export default PrimaryButton;
