import { ForwardRefExoticComponent, Fragment, SVGProps } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
} from "@heroicons/react/20/solid";

export type DropdownItemType = {
  name: string;
  value: string;
  icon: ForwardRefExoticComponent<
    SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  >;
  onClick: (value: string) => any;
};

type DropdownProps = {
  label: string;
  items: DropdownItemType[];
  disabled?: boolean;
  onClick?: () => any;
};

type MenuItemProps = {
  item: DropdownItemType;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const DropdownItemClasses = (isActive: boolean) => {
  return classNames(
    isActive ? "bg-gray-100 text-gray-900" : "text-gray-700",
    "group flex items-center px-4 py-2 text-sm cursor-pointer"
  );
};

const menuBtnBackground = (isDisabled: boolean | undefined) => {
  if (isDisabled) {
    return "bg-gray-200 text-coolGray-400 shadow-none ring-1 ring-inset ring-gray-100";
  }
  return "bg-white text-coolGray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50";
};

const MenuItem = ({ item }: MenuItemProps): JSX.Element => {
  const handleItemClick = () => {
    item.onClick(item.value);
  };
  return (
    <Menu.Item>
      {({ active }) => (
        <span className={DropdownItemClasses(active)} onClick={handleItemClick}>
          <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
          {item.name}
        </span>
      )}
    </Menu.Item>
  );
};

const Dropdown = ({ label, disabled, onClick, items }: DropdownProps): JSX.Element => {
  if (items.length === 0) {
    return <span></span>;
  }
  return (
    <Menu as="div" className="relative inline-block text-left" aria-disabled={disabled}>
      <div>
        <Menu.Button
          disabled={disabled}
          className={`inline-flex w-full justify-center gap-x-1.5 rounded-md px-4 py-2.5 text-sm font-medium ${menuBtnBackground(
            disabled
          )}`}
        >
          {label}
          <ChevronDownIcon
            className={`-mr-1 h-5 w-5 ${disabled ? "text-coolGray-400" : "text-coolGray-700"}`}
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {items.map((item, i) => {
              return <MenuItem key={`${i}-${item.value}`} item={item}></MenuItem>;
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
