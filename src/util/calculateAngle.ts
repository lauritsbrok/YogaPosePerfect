import { Coordinate3D } from '../model/Coordinate3D';
import { Keypoint } from '@tensorflow-models/pose-detection/dist/types';

function dotProduct(v1: number[], v2: number[]): number {
  return v1.reduce((sum, _, index) => sum + v1[index] * v2[index], 0);
}

function length(v: number[]): number {
  return Math.sqrt(dotProduct(v, v));
}

export function calculateAngle(point1: Keypoint, point2: Keypoint, point3: Keypoint): number {
  const v1 = [point1.x - point2.x, point1.y - point2.y, (point1.z ?? 0) - (point2.z ?? 0)];
  const v2 = [point3.x - point2.x, point3.y - point2.y, (point3.z ?? 0) - (point2.z ?? 0)];

  const dotProd = dotProduct(v1, v2);
  const lenV1 = length(v1);
  const lenV2 = length(v2);

  const cosAngle = dotProd / (lenV1 * lenV2);
  const angleRadians = Math.acos(cosAngle);
  const angleDegrees = (angleRadians * 180) / Math.PI;

  return angleDegrees;
}
