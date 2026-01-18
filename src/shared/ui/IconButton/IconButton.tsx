import { Tooltip, Button } from "@nextui-org/react";
import React, { ReactNode } from "react";
import QuestionMark from "../icons/icon-svg/QuestionMark";
import { cn } from "@/util/cn";
import { Icon, IconName } from "@/shared/ui/icons/Icon";

interface IconButtonProps {
  icon: IconName;
  ariaLabel?: string;
  size?: "sm" | "md" | "lg" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
}

export default function IconButton({
  icon,
  ariaLabel,
  size,
  onClick,
  className,
}: IconButtonProps) {
  return (
    <Button
      isIconOnly
      color="primary"
      size={size}
      aria-label={ariaLabel}
      className={cn(
        "p-3 rounded-full transition-all duration-100 hover:drop-shadow-lg !text-primary group",
        className
      )}
      onClick={onClick}
    >
      <Icon
        name={icon}
        className="!w-full !h-full transition-all duration-100 group-hover:scale-125"
      />
    </Button>
  );
}
