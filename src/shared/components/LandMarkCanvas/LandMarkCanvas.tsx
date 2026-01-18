"use client";
import React, { useEffect, useRef, useState } from "react";
import { Keypoint, Pose } from "@tensorflow-models/pose-detection";
import { RendererCanvas2d } from "@/util/RendererCanvas2d";
import { PosePrediction } from "@/pose_detection/posePredictor";

interface LandMarkCanvasProps {
  poses: Pose[];
  posePrediction?: PosePrediction;
  video: HTMLVideoElement;
  canvasWidth: number;
  canvasHeight: number;
  drawPosePrediction?: boolean;
  className?: string;
}

export default function LandMarkCanvas({
  poses,
  posePrediction,
  video,
  canvasWidth,
  canvasHeight,
  drawPosePrediction,
  className,
}: LandMarkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendererCanvas2d, setRendererCanvas2d] = useState<
    RendererCanvas2d | undefined
  >(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || poses === undefined || poses.length === 0) return;
    if (rendererCanvas2d === undefined) {
      setRendererCanvas2d(new RendererCanvas2d(canvas));
    } else {
      if (posePrediction) {
        const personHeight = calculateHeightFromPose(
          poses[0].keypoints,
          posePrediction
        );
        rendererCanvas2d.setOverlayImage(
          posePrediction,
          video.offsetWidth,
          video.offsetHeight,
          poses[0].keypoints,
          personHeight
        );
      }
      rendererCanvas2d.draw(video, poses, drawPosePrediction);
    }
  }, [poses, video, rendererCanvas2d, posePrediction, drawPosePrediction]);

  return (
    <canvas
      className={className}
      width={canvasWidth}
      height={canvasHeight}
      ref={canvasRef}
    />
  );
}

function calculateHeightFromPose(
  keypoints: Keypoint[],
  posePrediction: PosePrediction
): number {
  var endpoint = keypoints.find((kp) => kp.name === "nose");
  if (posePrediction.className === "Downward-Facing Dog") {
    endpoint = keypoints[24];
  } else if (posePrediction.className === "Four-Limbed Staff") {
    endpoint = keypoints[24];
  }

  // Find the lowest foot keypoint.
  const footPoints = [
    "left_heel",
    "right_heel",
    "left_foot_index",
    "right_foot_index",
  ];
  const feet = keypoints.filter((kp) =>
    footPoints.includes(kp.name ?? "unknown")
  );

  if (!endpoint || feet.length === 0) {
    throw new Error("Required keypoints are missing.");
  }

  // Assuming an upright pose, find the foot keypoint with the maximum `y` value.
  const lowestFoot = feet.reduce(
    (lowest, current) => (current.y > lowest.y ? current : lowest),
    feet[0]
  );

  // Calculate the vertical distance from the nose to the lowest foot.
  // This assumes the person is upright and ignores any x-axis differences.
  const heightY = Math.abs(lowestFoot.y - endpoint.y);
  const heightX = Math.abs(lowestFoot.x - endpoint.x);

  if (heightY < heightX) {
    return heightX;
  } else {
    return heightY;
  }
}
