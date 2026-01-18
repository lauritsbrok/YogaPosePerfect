import { Pose } from "@tensorflow-models/pose-detection";
import { calculatePoseAngles } from "@/util/calculatePoseAngles";
import { calculatePoseScore } from "@/util/calculatePoseAnglesScore";
import { getPerfectPoseAngles } from "@/util/getPerfectPoseAngles";

export interface PosePrediction {
  className: string;
  probability: number;
}

const POSE_CLASS_NAMES = [
  "Downward-Facing Dog",
  "Four-Limbed Staff",
  "Tree Pose",
  "Warrior 2",
];

export class PosePredictor {
  constructor() {
    // No-op for now. Placeholder for future model-based classifiers.
  }

  async init() {
    return;
  }

  async predictPose(pose?: Pose): Promise<PosePrediction | undefined> {
    if (!pose) return;

    const poseAngles = calculatePoseAngles(pose);
    let bestPrediction: PosePrediction | undefined;

    for (const className of POSE_CLASS_NAMES) {
      const perfectAngles = getPerfectPoseAngles({
        className,
        probability: 1,
      });
      if (perfectAngles.angles.length === 0) {
        continue;
      }

      const score = calculatePoseScore(poseAngles, perfectAngles);
      const prediction = {
        className,
        probability: score / 100,
      };

      if (
        !bestPrediction ||
        prediction.probability > bestPrediction.probability
      ) {
        bestPrediction = prediction;
      }
    }

    return bestPrediction;
  }
}
