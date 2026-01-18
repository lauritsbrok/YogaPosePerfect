import React, { ReactNode } from "react";
import { Tooltip as NextUITooltip, Button } from "@nextui-org/react";
import { cn } from "@/util/cn";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Tooltip({
  content,
  children,
  className,
}: TooltipProps) {
  return (
    <NextUITooltip
      content="I am a tooltip"
      className={cn("text-black", className)}
    >
      {children}
    </NextUITooltip>
  );
}
