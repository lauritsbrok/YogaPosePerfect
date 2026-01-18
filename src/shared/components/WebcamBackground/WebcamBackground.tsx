import { cn } from "@/util/cn";
import React from "react";
import Webcam from "react-webcam";

interface WebcamBackgroundProps {
  videoConstraints: MediaTrackConstraints;
  className?: string;
}

export default function WebcamBackground({
  videoConstraints,
  className,
}: WebcamBackgroundProps) {
  return (
    <div className={cn("absolute w-full h-screen overflow-hidden", className)}>
      <Webcam
        className="w-full blur-3xl"
        mirrored
        videoConstraints={videoConstraints}
      />
    </div>
  );
}
