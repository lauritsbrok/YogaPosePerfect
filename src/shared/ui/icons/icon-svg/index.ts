import dynamic from "next/dynamic";

export const icons = {
  TreePoseIcon: dynamic(() => import("./TreePoseIcon")),
  DownwardFacingDogIcon: dynamic(() => import("./DownwardFacingDogIcon")),
  FourLimbedStaffIcon: dynamic(() => import("./FourLimbedStaffIcon")),
  Warrior2Icon: dynamic(() => import("./Warrior2Icon")),
  EnterFullScreen: dynamic(() => import("./EnterFullScreen")),
  ExitFullScreen: dynamic(() => import("./ExitFullScreen")),
  Settings: dynamic(() => import("./Settings")),
  QuestionMark: dynamic(() => import("./QuestionMark")),
};

export const iconNames = [
  "TreePoseIcon",
  "DownwardFacingDogIcon",
  "FourLimbedStaffIcon",
  "Warrior2Icon",
  "EnterFullScreen",
  "ExitFullScreen",
  "Settings",
  "QuestionMark",
];
