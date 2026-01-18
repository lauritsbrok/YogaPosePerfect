import { calculateAngleDifference } from './calculateAngleDifference';

export function calculateLandmarkScore(
  recordedLandmarkAngle: number,
  expectedLandmarkAngle: number,
  thresholdDegrees: number,
  acceptedDifference: number
): number {
  // Calculate the absolute difference in angles
  const angleDifference = calculateAngleDifference(recordedLandmarkAngle, expectedLandmarkAngle);

  if (angleDifference <= thresholdDegrees) {
    return 100;
  }

  if (angleDifference <= acceptedDifference) {
    return 100 - ((angleDifference - thresholdDegrees) / (acceptedDifference - thresholdDegrees)) * 100;
  }

  return 0;
}
