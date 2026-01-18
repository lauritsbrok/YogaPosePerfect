import { Icon, IconName } from "@/shared/ui/icons/Icon";
import DownwardFacingDog from "@/shared/ui/icons/icon-svg/DownwardFacingDogIcon";
import FourLimbedStaff from "@/shared/ui/icons/icon-svg/FourLimbedStaffIcon";
import TreePose from "@/shared/ui/icons/icon-svg/TreePoseIcon";
import Warrior2 from "@/shared/ui/icons/icon-svg/Warrior2Icon";
import dynamic from "next/dynamic";
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface DetecedPoseProps {
  pose: string | undefined;
}

export default function DetecedPose({ pose }: DetecedPoseProps) {
  const PoseTitle = (): string => {
    switch (pose) {
      case "Downward-Facing Dog":
        return "Downward Facing Dog";
      case "Four-Limbed Staff":
        return "Four Limbed Staff";
      case "Tree Pose":
        return "Tree Pose";
      case "Warrior 2":
        return "Warrior II";
      default:
        return "Unknown Pose";
    }
  };
  return (
    <div className="bg-primary w-full rounded-r-lg flex flex-col justify-center items-center p-3 gap-2 backdrop-blur-md bg-opacity-50 text-black text-3xl font-light">
      <span className="tracking-wider">{PoseTitle()}</span>
    </div>
  );
}
