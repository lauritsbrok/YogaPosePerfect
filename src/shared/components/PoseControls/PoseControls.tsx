import IconButton from "@/shared/ui/IconButton/IconButton";
import EnterFullScreen from "@/shared/ui/icons/icon-svg/EnterFullScreen";
import QuestionMark from "@/shared/ui/icons/icon-svg/QuestionMark";
import Settings from "@/shared/ui/icons/icon-svg/Settings";
import React from "react";
import Tooltip from "@/shared/components/Tooltip/Tooltip";
import ExitFullScreen from "@/shared/ui/icons/icon-svg/ExitFullScreen";
import { cn } from "@/util/cn";

interface PoseControlsProps {
  isFullScreen?: boolean;
  openFullScreen: () => void;
  closeFullScreen: () => void;
  onHelperOpen: () => void;
  className?: string;
}

export default function PoseControls({
  isFullScreen,
  openFullScreen,
  closeFullScreen,
  onHelperOpen,
  className,
}: PoseControlsProps) {
  return (
    <div className={cn("flex flex-row items-center gap-2", className)}>
      {!isFullScreen && (
        <IconButton
          icon={"QuestionMark"}
          size="lg"
          onClick={onHelperOpen}
          className="drop-shadow-md hidden xl:flex"
        />
      )}
      <IconButton
        icon={!isFullScreen ? "EnterFullScreen" : "ExitFullScreen"}
        size="lg"
        onClick={!isFullScreen ? openFullScreen : closeFullScreen}
        className=" drop-shadow-md"
      />
      {/* <IconButton icon={"Settings"} size="lg" /> */}
    </div>
  );
}
