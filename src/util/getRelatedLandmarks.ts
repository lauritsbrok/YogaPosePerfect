import landmarkIndexes from "@/assets/mediapipeIndexes/mediapipeIndexes.json";

type LandmarkRelations = {
  landmark1: keyof typeof landmarkIndexes;
  target: keyof typeof landmarkIndexes;
  landmark2: keyof typeof landmarkIndexes;
};

export function getRelatedLandmarks(
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
