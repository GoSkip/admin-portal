type InputSectionProps = {
  label: string;
  value: string;
  htmlId: string;
  disabled?: boolean;
  onChange?: (value: any) => any;
};

const InputSection = ({
  htmlId,
  label,
  value,
  disabled,
  onChange,
}: InputSectionProps): JSX.Element => {
  const change = onChange ? onChange : () => {};

  return (
    <div className="sm:col-span-1">
      <label
        htmlFor={htmlId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          type="text"
          name={htmlId}
          id={htmlId}
          value={value}
          disabled={disabled}
          onChange={(e) => change(e.target.value)}
          className="block w-full rounded-md border border-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-4"
        />
      </div>
    </div>
  );
};

export default InputSection;
