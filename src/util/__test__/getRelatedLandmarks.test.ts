import { getRelatedLandmarks } from '../getRelatedLandmarks';

describe('getRelatedLandmarks', () => {
  it('returns correct relations for "left elbow"', () => {
    const result = getRelatedLandmarks('left elbow');
    expect(result).toEqual({ landmark1: 'left wrist', target: 'left elbow', landmark2: 'left shoulder' });
  });

  it('returns correct relations for "right elbow"', () => {
    const result = getRelatedLandmarks('right elbow');
    expect(result).toEqual({ landmark1: 'right wrist', target: 'right elbow', landmark2: 'right shoulder' });
  });
});
