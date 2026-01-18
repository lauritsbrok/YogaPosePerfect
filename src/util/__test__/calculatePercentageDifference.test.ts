import { calculateAngleDifference } from '../calculateAngleDifference';

describe('calculateAngleDifference', () => {
  it('calculates percentage difference correctly when angle1 is greater', () => {
    const angle1 = 180;
    const angle2 = 90;
    const expectedPercentageDifference = 90;

    const result = calculateAngleDifference(angle1, angle2);

    expect(result).toBeCloseTo(expectedPercentageDifference);
  });

  it('calculates percentage difference correctly when angle2 is greater', () => {
    const angle1 = 180;
    const angle2 = 0;
    const expectedPercentageDifference = 180;

    const result = calculateAngleDifference(angle1, angle2);

    expect(result).toBeCloseTo(expectedPercentageDifference);
  });

  it('calculates percentage difference correctly when angles are equal', () => {
    const angle1 = 45;
    const angle2 = 180;
    const expectedPercentageDifference = 135;

    const result = calculateAngleDifference(angle1, angle2);

    expect(result).toBe(expectedPercentageDifference);
  });
});
