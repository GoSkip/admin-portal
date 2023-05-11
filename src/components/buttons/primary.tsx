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

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={_onClick}
      className={`inline-flex items-center justify-center rounded-md border border-transparent bg-[#0284c7] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto ${additionalClasses}`}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
