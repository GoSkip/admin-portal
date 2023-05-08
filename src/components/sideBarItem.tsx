import { useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

export default function SideBarItem({ item }: any) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (item.children) {
    return (
      <li>
        <button
          className={
            "flex items-center w-full p-2 text-base font-normal text-[#4b5563] transition duration-200 border-transparent border-l-4 hover:border-l-4 hover:border-[#0284c7] hover:text-[#0284c7] hover:bg-[#f0f9ff]"
          }
          onClick={() => setOpen(!open)}
        >
          <item.Icon className="flex-shrink-0 w-6 h-6 mr-5" />
          {item.label}
          <ChevronUpIcon
            className={open ? "w-6 h-6 ml-auto" : "w-6 h-6 rotate-180 ml-auto"}
          />
        </button>
        <ul className={open ? "py-2 space-y-2" : "hidden"}>
          {item.children.map((child: any, index: any) => (
            <li key={index}>
              <button
                className={`flex items-center w-full p-2  text-base font-normal text-[#4b5563] transition duration-200 border-transparent border-l-4 hover:border-l-4 hover:border-[#0284c7] hover:text-[#0284c7] hover:bg-[#f0f9ff]`}
                onClick={() => navigate(child.to)}
              >
                <span className={"ml-16"}>{child.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </li>
    );
  } else {
    return (
      <li>
        <button
          className="flex items-center w-full p-2 text-base font-normal text-[#4b5563] transition duration-200 border-transparent border-l-4 hover:border-l-4 hover:border-[#0284c7] hover:text-[#0284c7] hover:bg-[#f0f9ff]"
          onClick={() => navigate(item.to)}
        >
          <item.Icon className="flex-shrink-0 w-6 h-6 mr-4" />
          {item.label}
        </button>
      </li>
    );
  }
}
