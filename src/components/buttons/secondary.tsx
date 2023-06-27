type SecondaryButtonProps = {
  label: string;
  additionalClasses?: string;
  disabled?: boolean;
  onClick?: () => any;
};

const SecondaryButton = ({
  label,
  additionalClasses,
  disabled,
  onClick,
}: SecondaryButtonProps): JSX.Element => {
  let _onClick = () => {};

  if (onClick) {
    _onClick = onClick;
  }

  const initClasses = [
    "inline-flex items-center justify-center",
    "rounded-md border border-transparent",
    "text-sm font-medium text-black",
    "px-4 py-2 transition-all",
    "bg-white shadow-sm",
    "hover:bg-gray-300",
    "focus:outline-none focus:ring-2 rocus:ring-gray-100 focus:ring-offset-2",
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

export default SecondaryButton;
