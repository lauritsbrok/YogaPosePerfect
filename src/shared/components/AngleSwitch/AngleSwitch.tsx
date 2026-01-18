import { cn } from "@/util/cn";
import { Switch } from "@nextui-org/react";
import React from "react";

interface AngleSwitchProps {
  onValueChange: (isSelected: boolean) => void;
  className?: string;
}

export default function AngleSwitch({
  onValueChange,
  className,
}: AngleSwitchProps) {
  return (
    <div
      className={cn(
        "bg-primary p-4 backdrop-blur-lg bg-opacity-50 rounded-l-lg",
        className
      )}
    >
      <Switch
        size="lg"
        color="secondary"
        className=" drop-shadow-lg"
        onValueChange={onValueChange}
      >
        Show Angles
      </Switch>
    </div>
  );
}
