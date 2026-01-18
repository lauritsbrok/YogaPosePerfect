import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { cn } from "@/util/cn";
import { Progress } from "@nextui-org/react";
import { colors } from "@/shared/styles";

interface PoseScoreProps {
  value: number;
  className?: string;
}

export default function PoseScore({ value, className }: PoseScoreProps) {
  return (
    <div
      className={cn(
        "bg-primary w-full lg:aspect-square rounded-r-lg flex flex-col justify-center items-center p-6 gap-2 backdrop-blur-md bg-opacity-50 text-black",
        className
      )}
    >
      <CircularProgressbar
        value={value}
        text={`${value}`}
        className="text-primary hidden lg:flex"
        strokeWidth={5}
        styles={buildStyles({
          textColor: colors.secondary?.toString(),
          pathColor: colors.secondary?.toString(),
          trailColor: colors.primary?.toString(),
          rotation: 1 / 2 + 1 / 8,
          strokeLinecap: "butt",
          textSize: 40,
        })}
      />
      <Progress
        value={value}
        color="secondary"
        showValueLabel
        className="lg:hidden"
      />
    </div>
  );
}
