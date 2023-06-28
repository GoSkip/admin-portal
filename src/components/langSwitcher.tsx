import react, { FC, Fragment, useContext, useEffect, useState } from "react";

import { Menu, Transition } from "@headlessui/react";
import ReactCountryFlag from "react-country-flag";
import { SessionContext, SessionContextType } from "@contexts/SessionContext";
import i18n from "@/i18n";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type LangType = {
  label: string;
  value: string;
  flag: string;
};

const availableLangs: LangType[] = [
  {
    label: "English",
    value: "en",
    flag: "gb",
  },
  {
    label: "Français",
    value: "fr",
    flag: "fr",
  },
  {
    label: "Deutsch",
    value: "de",
    flag: "de",
  },
];

const CountryFlag: FC<{ code: string }> = ({ code }) => {
  return (
    <ReactCountryFlag
      countryCode={code}
      svg
      cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
      cdnSuffix="svg"
      title={code}
      style={{
        width: "16px",
        height: "16px",
        borderRadius: "8px",
      }}
    />
  );
};

const MenuItem: FC<LangType> = ({ value, label, flag }) => {
  const { session, setLang } = useContext<SessionContextType>(SessionContext);
  const isDisabled = session.lang === value;
  const switchLang = () => {
    setLang(value);
    i18n.changeLanguage(value);
    window.location.reload();
  };
  return (
    <Menu.Item disabled={isDisabled}>
      {({ disabled }) => (
        <span
          className={classNames(
            disabled ? "opacity-40" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            "group flex gap-3 items-center px-4 py-2 text-sm cursor-pointer select-none"
          )}
          onClick={switchLang}
        >
          <CountryFlag code={flag}></CountryFlag>
          {label}
        </span>
      )}
    </Menu.Item>
  );
};

const LangSwitcher: FC = () => {
  const { session } = useContext<SessionContextType>(SessionContext);
  const [lang, setLang] = useState<LangType>(availableLangs[0]);

  useEffect(() => {
    const newLang = availableLangs.find(l => l.value === session.lang);
    if (newLang) {
      setLang(newLang);
    }
  }, [session.lang]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center w-full justify-center gap-x-2 rounded-md px-1 py-2 text-sm font-semibold text-lightBlue-200 hover:text-lightBlue-100 transition">
          <CountryFlag code={lang.flag}></CountryFlag>
          {lang.label}
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {availableLangs.map((lang, i) => {
              return (
                <MenuItem key={`${lang.value}-${i}`} value={lang.value} label={lang.label} flag={lang.flag}></MenuItem>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LangSwitcher;
