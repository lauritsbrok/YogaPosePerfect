import { PoseAngles } from '../model/PoseAngles';
import { PosePrediction } from '../pose_detection/posePredictor';

export const getPerfectPoseAngles = (posePrediction: PosePrediction): PoseAngles => {
  const defaultPose: PoseAngles = {
    angles: [],
  };

  switch (posePrediction.className) {
    case 'Downward-Facing Dog':
      return {
        angles: [
          {
            landmarkKey: 'left knee',
            angle: 165,
          },
          {
            landmarkKey: 'right knee',
            angle: 170,
          },
          {
            landmarkKey: 'left hip',
            angle: 80,
          },
          {
            landmarkKey: 'right hip',
            angle: 90,
          },
          {
            landmarkKey: 'left elbow',
            angle: 150,
          },
          {
            landmarkKey: 'right elbow',
            angle: 140,
          },
          {
            landmarkKey: 'left shoulder',
            angle: 165,
          },
          {
            landmarkKey: 'right shoulder',
            angle: 165,
          },
        ],
      };
    case 'Four-Limbed Staff':
      return {
        angles: [
          {
            landmarkKey: 'left knee',
            angle: 165,
          },
          {
            landmarkKey: 'right knee',
            angle: 170,
          },
          {
            landmarkKey: 'left hip',
            angle: 165,
          },
          {
            landmarkKey: 'right hip',
            angle: 175,
          },
          {
            landmarkKey: 'left elbow',
            angle: 125,
          },
          {
            landmarkKey: 'right elbow',
            angle: 125,
          },
          {
            landmarkKey: 'left ankle',
            angle: 105,
          },
          {
            landmarkKey: 'right ankle',
            angle: 105,
          },
        ],
      };
    case 'Tree Pose':
      return {
        angles: [
          {
            landmarkKey: 'left shoulder',
            angle: 30,
          },
          {
            landmarkKey: 'right shoulder',
            angle: 30,
          },
          {
            landmarkKey: 'left knee',
            angle: 150,
          },
          {
            landmarkKey: 'right knee',
            angle: 40,
          },
          {
            landmarkKey: 'left hip',
            angle: 165,
          },
          {
            landmarkKey: 'right hip',
            angle: 105,
          },
          {
            landmarkKey: 'left elbow',
            angle: 85,
          },
          {
            landmarkKey: 'right elbow',
            angle: 70,
          },
          // {
          //   landmarkKey: 'right ankle',
          //   angle: 125,
          // },
          // {
          //   landmarkKey: 'left ankle',
          //   angle: 125,
          // },
        ],
      };
    case 'Warrior 2':
      return {
        angles: [
          {
            landmarkKey: 'left knee',
            angle: 145,
          },
          {
            landmarkKey: 'right knee',
            angle: 105,
          },
          {
            landmarkKey: 'left hip',
            angle: 120,
          },
          {
            landmarkKey: 'right hip',
            angle: 90,
          },
          {
            landmarkKey: 'left elbow',
            angle: 170,
          },
          {
            landmarkKey: 'right elbow',
            angle: 155,
          },
          {
            landmarkKey: 'left shoulder',
            angle: 85,
          },
          {
            landmarkKey: 'right shoulder',
            angle: 100,
          },
        ],
      };
    default:
      return defaultPose;
  }
};
