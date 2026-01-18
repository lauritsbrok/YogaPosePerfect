import React from "react";

import { icons, iconNames as names } from "./icon-svg";

export type IconName = keyof typeof icons;

export interface IconProps {
  /**
   * Icon name based on .svg file name.
   */
  name: IconName;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Color will be applied to the "stroke" or "fill" property depending on SVG structure of the requested icon
   */
  color?: string;
  /**
   * How large should the icon be? If number provided - it will be applied in px, if string - as it is. Applying to "width" or "height" properties
   */
  size?: number | string;
  /**
   * Optional css style property
   */
  width?: string;
  /**
   * Optional css style property
   */
  height?: string;
  /**
   * Optional stroke-width value
   */
  stroke?: number;
}

/**
 * Common UI component for icon rendering
 */
export const Icon = ({
  name,
  color,
  width,
  height,
  size = 20,
  stroke,
  className,
  ...props
}: IconProps) => {
  let icon = name;

  if (names.indexOf(name) === -1) {
    icon = "QuestionMark";
  }

  const IconComponent = icons[icon];

  return (
    <IconComponent
      width={width || size}
      height={height || size}
      color={color}
      className={className}
      // to use "stroke" property for some of the icons it is needed to remove '.cls' className from path elements in the same way it is done for "ic-location.svg"
      {...(stroke ? { strokeWidth: `${stroke}px` } : {})}
      // accessibility
      aria-hidden={true}
      focusable={false} // See: https://allyjs.io/tutorials/focusing-in-svg.html#making-svg-elements-focusable
      {...props}
    />
  );
};

export const iconNames = [...names];
