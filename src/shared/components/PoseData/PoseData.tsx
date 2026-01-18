import React from "react";
import PoseScore from "../PoseScore/PoseScore";
import DetecedPose from "../DetectedPose/DetecedPose";
import { cn } from "@/util/cn";

interface PoseDataProps {
  poseScore: number;
  detectedPose: string | undefined;
  className?: string;
}

export default function PoseData({
  poseScore,
  detectedPose,
  className,
}: PoseDataProps) {
  return (
    <div className={cn("flex flex-col gap-2 w-96", className)}>
      <DetecedPose pose={detectedPose} />
      <PoseScore value={detectedPose ? poseScore : 0} />
    </div>
  );
}
