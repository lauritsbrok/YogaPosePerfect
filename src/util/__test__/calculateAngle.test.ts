import { Keypoint } from '@tensorflow-models/pose-detection/dist/types';
import { calculateAngle } from '../calculateAngle';

describe('calculateAngle', () => {
  test('should return 90 degrees for a right angle', () => {
    const point1: Keypoint = { x: 1, y: 0, z: 0 };
    const targetPoint: Keypoint = { x: 0, y: 0, z: 0 };
    const point3: Keypoint = { x: 0, y: 1, z: 0 };
    expect(calculateAngle(point1, targetPoint, point3)).toBeCloseTo(90);
  });

  test('should return 180 degrees for collinear points', () => {
    const point1: Keypoint = { x: 0, y: 0, z: 0 };
    const targetPoint: Keypoint = { x: 1, y: 0, z: 0 };
    const point3: Keypoint = { x: 2, y: 0, z: 0 };
    expect(calculateAngle(point1, targetPoint, point3)).toBeCloseTo(180);
  });

  test('should return 180 degrees for collinear points in 3D', () => {
    const point1: Keypoint = { x: 0, y: 0, z: 0 };
    const targetPoint: Keypoint = { x: 1, y: 0, z: 0 };
    const point3: Keypoint = { x: 2, y: 0, z: 0 };
    expect(calculateAngle(point1, targetPoint, point3)).toBeCloseTo(180);
  });

  test('should return 45 degrees for points forming an equilateral triangle', () => {
    const point1: Keypoint = { x: 0, y: 0, z: 0 };
    const targetPoint: Keypoint = { x: 1, y: 0, z: 0 };
    const point3: Keypoint = { x: 0.5, y: Math.sqrt(3) / 2, z: 0 };
    expect(calculateAngle(point1, targetPoint, point3)).toBeCloseTo(60);
  });
});
