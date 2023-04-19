type InputProps = {
  label?: string;
  value: string;
  htmlId: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  htmlId,
  value,
  disabled,
  onChange,
}: InputProps): JSX.Element => {
  return (
    <div className="relative mt-1">
      <input
        type="text"
        name={htmlId}
        id={htmlId}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-4"
      />
    </div>
  );
};

export default Input;
