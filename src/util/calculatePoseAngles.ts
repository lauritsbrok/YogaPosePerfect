import { Pose } from "@tensorflow-models/pose-detection/dist/types";
import { PoseAngles } from "@/model/PoseAngles";
import { calculateAngle } from "./calculateAngle";
import landmarkIndexes from "@/assets/mediapipeIndexes/mediapipeIndexes.json";

type LandmarkRelations = {
  landmark1: keyof typeof landmarkIndexes;
  target: keyof typeof landmarkIndexes;
  landmark2: keyof typeof landmarkIndexes;
};

function flipLandmark(
  landmarkKey: keyof typeof landmarkIndexes
): keyof typeof landmarkIndexes {
  if (landmarkKey.includes("right")) {
    return landmarkKey.replace("right", "left") as keyof typeof landmarkIndexes;
  } else if (landmarkKey.includes("left")) {
    return landmarkKey.replace("left", "right") as keyof typeof landmarkIndexes;
  }
  return landmarkKey;
}

function getRelatedLandmarks(
  landmarkKey: keyof typeof landmarkIndexes
): LandmarkRelations | undefined {
  switch (landmarkKey) {
    case "left elbow":
      return {
        landmark1: "left wrist",
        target: landmarkKey,
        landmark2: "left shoulder",
      };
    case "right elbow":
      return {
        landmark1: "right wrist",
        target: landmarkKey,
        landmark2: "right shoulder",
      };
    case "left hip":
      return {
        landmark1: "left knee",
        target: landmarkKey,
        landmark2: "left shoulder",
      };
    case "right hip":
      return {
        landmark1: "right knee",
        target: landmarkKey,
        landmark2: "right shoulder",
      };
    case "left knee":
      return {
        landmark1: "left hip",
        target: landmarkKey,
        landmark2: "left ankle",
      };
    case "right knee":
      return {
        landmark1: "right hip",
        target: landmarkKey,
        landmark2: "right ankle",
      };
    case "left shoulder":
      return {
        landmark1: "left hip",
        target: landmarkKey,
        landmark2: "left elbow",
      };
    case "right shoulder":
      return {
        landmark1: "right hip",
        target: landmarkKey,
        landmark2: "right elbow",
      };
    case "left ankle":
      return {
        landmark1: "left knee",
        target: landmarkKey,
        landmark2: "left foot index",
      };
    case "right ankle":
      return {
        landmark1: "right knee",
        target: landmarkKey,
        landmark2: "right foot index",
      };
    default:
      return undefined;
  }
}

export function calculatePoseAngles(pose: Pose): PoseAngles {
  const poseAngles: PoseAngles = {
    angles: [],
  };
  const keypoints = pose.keypoints3D || pose.keypoints;
  Object.keys(landmarkIndexes).map((landmarkKeyRaw) => {
    const landmarkKey = landmarkKeyRaw as keyof typeof landmarkIndexes;
    const landmarkRelation = getRelatedLandmarks(landmarkKey);
    if (landmarkRelation) {
      const angle = calculateAngle(
        keypoints[landmarkIndexes[landmarkRelation.landmark1]],
        keypoints[landmarkIndexes[landmarkRelation.target]],
        keypoints[landmarkIndexes[landmarkRelation.landmark2]]
      );
      keypoints[landmarkIndexes[landmarkRelation.target]];
      poseAngles.angles.push({
        landmarkKey: landmarkRelation.target,
        angle: angle,
        visibilityScore:
          keypoints[landmarkIndexes[landmarkRelation.target]].score,
      });
    }
  });
  return poseAngles;
}
