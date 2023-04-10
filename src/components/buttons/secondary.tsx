import classNames from "classnames";
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

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={_onClick}
      className={classNames(
        disabled ? "bg-gray-200 text-white" : "bg-white hover:bg-gray-50",
        `rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${additionalClasses}`
      )}
    >
      {label}
    </button>
  );
};

export default SecondaryButton;
