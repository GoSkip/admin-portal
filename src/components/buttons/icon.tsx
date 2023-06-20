import Icon from "@mdi/react";
import React, { FC, ForwardRefExoticComponent, SVGProps } from "react";

type HeroIconType = ForwardRefExoticComponent<
  SVGProps<SVGSVGElement> & {
    title?: string | undefined;
    titleId?: string | undefined;
  }
>;

type IconBtnProps = {
  icon: string | HeroIconType;
  customClasses?: string;
  color?: string;
  colorHover?: string;
  backgroundColor?: string;
  size?: string | number;
  srOnlyText?: string;
  onClick?: () => void;
};

export const IconButton: FC<IconBtnProps> = ({
  icon,
  customClasses = "",
  color = "gray-200",
  colorHover = "gray-500",
  backgroundColor = "transparent",
  size = 1,
  srOnlyText,
  onClick,
}) => {
  const classes: string[] = [
    "transition",
    `text-${color || "black"} hover:text-${colorHover}`,
    `bg-${backgroundColor}-600 hover:bg-${backgroundColor}-500 focus-visible:outline-${backgroundColor}-600`,
    `rounded-full p-${size} focus-visible:outline`,
    `shadow-${size == 0 ? "0" : "sm"}`,
    `focus-visible:outline-${size == 0 ? 0 : 2}`,
    `focus-visible:outline-offset-${size == 0 ? 0 : 2}`,
    customClasses,
  ];

  const iconObj = {
    icon,
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button type="button" className={classes.join(" ")} onClick={handleClick}>
      {srOnlyText && <span className="sr-only">{srOnlyText}</span>}
      {typeof iconObj.icon === "string" ? (
        <Icon path={iconObj.icon} size={1} />
      ) : (
        <iconObj.icon className="h-6 w-6" aria-hidden="true" />
      )}
    </button>
  );
};
