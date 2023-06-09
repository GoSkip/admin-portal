import { Icon } from "@mdi/react";
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
  backgroundColorHover?: string;
  size?: string | number;
  srOnlyText?: string;
  small?: boolean;
  onClick?: () => void;
};

export const IconButton: FC<IconBtnProps> = ({
  icon,
  customClasses = "",
  color = "gray-200",
  colorHover = "gray-500",
  backgroundColor = "",
  backgroundColorHover = "",
  size = 1,
  small,
  srOnlyText,
  onClick,
}) => {
  const classes: string[] = [
    "transition",
    `text-${color || "black"} hover:text-${colorHover}`,
    `bg-${backgroundColor} hover:bg-${backgroundColorHover} focus-visible:outline-${backgroundColorHover}`,
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
        <iconObj.icon className={small ? "h-4 w-4" : "h-6 w-6"} aria-hidden="true" />
      )}
    </button>
  );
};
