import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

export type SelectListItemType = {
  title: string;
  desc: string;
  value: string;
  [key: string]: string | number | Date | boolean | undefined;
};

type SelectListProps = {
  label: string;
  items: SelectListItemType[];
  disabled?: boolean;
  value?: string | null;
  onChange?: (v: string) => any;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const SelectList = ({ label, items, disabled, value = null, onChange }: SelectListProps): JSX.Element => {
  const [selected, setSelected] = useState<string | null>(value);

  const handleChange = (v: string) => {
    setSelected(v);
    if (onChange) {
      onChange(v);
    }
  };

  return (
    <RadioGroup value={selected} onChange={handleChange}>
      <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
      <div className="-space-y-px rounded-md bg-white">
        {items.map((setting, settingIdx) => (
          <RadioGroup.Option
            key={setting.title}
            value={setting.value}
            className={({ checked }) =>
              classNames(
                settingIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                settingIdx === items.length - 1 ? "rounded-bl-md rounded-br-md" : "",
                checked ? "z-10 border-lightBlue-200 bg-lightBlue-50" : "border-gray-200",
                "relative flex cursor-pointer border p-4 focus:outline-none"
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span
                  className={classNames(
                    checked ? "bg-lightBlue-600 border-transparent" : "bg-white border-gray-300",
                    "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center"
                  )}
                  aria-hidden="true"
                >
                  <span className="rounded-full bg-white w-1.5 h-1.5" />
                </span>
                <span className="ml-3 flex flex-col">
                  <RadioGroup.Label
                    as="span"
                    className={classNames(
                      checked ? "text-lightBlue-900" : "text-gray-900",
                      "block text-sm font-medium"
                    )}
                  >
                    {setting.title}
                  </RadioGroup.Label>
                  <RadioGroup.Description
                    as="span"
                    className={classNames(checked ? "text-lightBlue-700" : "text-gray-500", "block text-sm")}
                  >
                    {setting.desc}
                  </RadioGroup.Description>
                </span>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default SelectList;
