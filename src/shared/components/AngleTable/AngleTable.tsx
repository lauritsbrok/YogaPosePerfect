import { PoseAngles } from "@/model/PoseAngles";
import { PosePrediction } from "@/pose_detection/posePredictor";
import { calculateLandmarkScore } from "@/util/calculateLandmarkScore";
import { cn } from "@/util/cn";
import React from "react";

interface DebugTableProps {
  poseAngles: PoseAngles;
  poseAnglesGoal: PoseAngles;
  posePrediction: PosePrediction;
  className?: string;
}

export default function AngleTable({
  poseAngles,
  poseAnglesGoal,
  posePrediction,
  className,
}: DebugTableProps) {
  return (
    <table
      className={cn(
        "text-black bg-primary text-lg z-20 bg-opacity-70 backdrop-blur-md w-full p-5 rounded-r-lg",
        className
      )}
    >
      <tr className="text-xs text-left">
        <th>Landmark Key</th>
        <th>Angle</th>
        <th>Goal Angle</th>
        <th>Score</th>
      </tr>
      {poseAngles.angles.map((poseAngle) => {
        const perfectAngle = poseAnglesGoal.angles.find(
          (angle) => angle.landmarkKey === poseAngle.landmarkKey
        );
        const angleScore = perfectAngle
          ? calculateLandmarkScore(poseAngle.angle, perfectAngle.angle, 10, 30)
          : 0;
        const color = `rgb(${255 - (angleScore * 255) / 100}, ${
          (angleScore * 255) / 100
        }, 0)`;
        return (
          <tr key={poseAngle.landmarkKey} className="text-xs">
            <td>{poseAngle.landmarkKey} </td>
            <td>{Math.round(poseAngle.angle / 5) * 5}°</td>
            <td>{perfectAngle ? perfectAngle.angle : 0}°</td>
            <td style={{ color: color }}>{Math.round(angleScore / 5) * 5}%</td>
          </tr>
        );
      })}
    </table>
  );
}
