import { PoseAngles } from '../model/PoseAngles';
import { calculateLandmarkScore } from './calculateLandmarkScore';

export const calculatePoseScore = (recordedAngles: PoseAngles, perfectAngles: PoseAngles): number => {
  let totalScore: number = 0;
  let flippedScore: number = 0;
  let totalPossibleScore: number = 0;
  const threshold = 5;
  const acceptableRange = 25;

  perfectAngles.angles.forEach((perfectAngle) => {
    const recordedAngle = recordedAngles.angles.find(
      (recordedAngle) => recordedAngle.landmarkKey === perfectAngle.landmarkKey
    );

    if (recordedAngle) {
      const angleScore = calculateLandmarkScore(recordedAngle.angle, perfectAngle.angle, threshold, acceptableRange);
      totalScore += angleScore;
      totalPossibleScore += 100;
    }

    if (recordedAngles.flippedAngles) {
      const flippedAngle = recordedAngles.flippedAngles.find(
        (recordedAngle) => recordedAngle.landmarkKey === perfectAngle.landmarkKey
      );
      if (flippedAngle) {
        const angleScore = calculateLandmarkScore(flippedAngle.angle, perfectAngle.angle, threshold, acceptableRange);
        flippedScore += angleScore;
      }
    }
  });

  if (totalScore > flippedScore) {
    return (totalScore / totalPossibleScore) * 100;
  }
  return (flippedScore / totalPossibleScore) * 100;
};
