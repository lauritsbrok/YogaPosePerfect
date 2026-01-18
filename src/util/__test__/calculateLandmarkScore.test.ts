import { calculateLandmarkScore } from '../calculateLandmarkScore';

describe('calculateLandmarkScore', () => {
  it('returns 100 when angle difference is within the threshold', () => {
    const recordedLandmarkAngle = 45;
    const expectedLandmarkAngle = 45;
    const thresholdDegrees = 2;
    const acceptedDifference = 20;

    const result = calculateLandmarkScore(
      recordedLandmarkAngle,
      expectedLandmarkAngle,
      thresholdDegrees,
      acceptedDifference
    );

    expect(result).toBe(100);
  });

  it('calculates score correctly when angle difference is within the accepted range', () => {
    const recordedLandmarkAngle = 50;
    const expectedLandmarkAngle = 45;
    const thresholdDegrees = 2;
    const acceptedDifference = 20;
    const expectedScore = 83.33;

    const result = calculateLandmarkScore(
      recordedLandmarkAngle,
      expectedLandmarkAngle,
      thresholdDegrees,
      acceptedDifference
    );

    expect(result).toBeCloseTo(expectedScore);
  });

  it('returns 0 when angle difference exceeds accepted difference', () => {
    const recordedLandmarkAngle = 70;
    const expectedLandmarkAngle = 45;
    const thresholdDegrees = 10;
    const acceptedDifference = 20;

    const result = calculateLandmarkScore(
      recordedLandmarkAngle,
      expectedLandmarkAngle,
      thresholdDegrees,
      acceptedDifference
    );

    expect(result).toBe(0);
  });
});
