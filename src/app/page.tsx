"use client";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { PoseDetector } from "@/pose_detection/poseDetector";
import * as poseDetection from "@tensorflow-models/pose-detection";
import LandMarkCanvas from "@/shared/components/LandMarkCanvas/LandMarkCanvas";
import { PosePrediction, PosePredictor } from "@/pose_detection/posePredictor";
import { calculatePoseAngles } from "../util/calculatePoseAngles";
import { getPerfectPoseAngles } from "../util/getPerfectPoseAngles";
import { calculatePoseScore } from "../util/calculatePoseAnglesScore";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import WebcamBackground from "@/shared/components/WebcamBackground/WebcamBackground";
import PoseData from "@/shared/components/PoseData/PoseData";
import PoseControls from "@/shared/components/PoseControls/PoseControls";
import { CircularProgress, useDisclosure } from "@nextui-org/react";
import AngleSwitch from "@/shared/components/AngleSwitch/AngleSwitch";
import DebugTable from "@/shared/components/AngleTable/AngleTable";
import YogaPosesHelperModal from "@/shared/components/YogaPosesHelperModal/YogaPosesHelperModal";

export default function Pose() {
  const {
    isOpen: isYogaHelperOpen,
    onOpen: onYogaHelperOpen,
    onOpenChange: onYogaHelperOpenChange,
  } = useDisclosure();
  const [showAngleTable, setShowAngleTable] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const [userMedia, setUserMedia] = useState<MediaStream | undefined>(
    undefined
  );
  const [poseDetector, setPoseDetector] = useState<PoseDetector | undefined>(
    undefined
  );
  const [posePredictor, setPosePredictor] = useState<PosePredictor | undefined>(
    undefined
  );
  const [poses, setPoses] = useState<poseDetection.Pose[]>([]);
  const [posePrediction, setPosePrediction] = useState<
    PosePrediction | undefined
  >(undefined);
  const [isLandscape, setIsLandscape] = useState(false);
  const [loading, setLoading] = useState(true);
  const handle = useFullScreenHandle();
  const predictionConfidenceThreshold = 0.7;

  useEffect(() => {
    const onResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    // Add event listener for resize
    window.addEventListener("resize", onResize);
    setIsLandscape(window.innerWidth > window.innerHeight);
    // Clean up
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    async function fetchCamera() {
      if (userMedia && document && poseDetector === undefined) {
        const poseDetector = new PoseDetector();
        const posePredictor = new PosePredictor();
        await poseDetector.init(userMedia);
        await posePredictor.init();
        setPoseDetector(poseDetector);
        setPosePredictor(posePredictor);
        setLoading(false);
      }
    }
    fetchCamera();
  }, [userMedia, poseDetector]);

  useEffect(() => {
    let isActive = true;
    let lastPrediction: PosePrediction | undefined;
    let samePredictionCount = 0;

    const loop = async () => {
      if (!poseDetector || !isActive) return;

      const latestPoses = await poseDetector.renderResult();
      if (!isActive) return;
      setPoses(latestPoses);

      if (posePredictor && latestPoses.length > 0) {
        const newPosePrediction = await posePredictor.predictPose(
          latestPoses[0]
        );
        if (!isActive) return;
        if (newPosePrediction) {
          if (lastPrediction?.className === newPosePrediction.className) {
            samePredictionCount++;
          } else {
            samePredictionCount = 0;
          }
          if (
            samePredictionCount > 10 &&
            newPosePrediction.probability > predictionConfidenceThreshold
          ) {
            setPosePrediction(newPosePrediction);
          }
          lastPrediction = newPosePrediction;
        }
      }

      requestAnimationFrame(loop);
    };

    if (isLandscape) {
      loop();
    }

    return () => {
      isActive = false;
    };
  }, [poseDetector, posePredictor, isLandscape, predictionConfidenceThreshold]);

  let score = 0;
  if (poses.length > 0 && posePrediction) {
    const poseAngles = calculatePoseAngles(poses[0]);
    const perfectAngles = getPerfectPoseAngles(posePrediction);
    const scoreFloat = calculatePoseScore(poseAngles, perfectAngles);
    score = Math.round(scoreFloat);
  }

  const videoConstraints: MediaTrackConstraints = {
    facingMode: "user",
  };

  return (
    <main className="overflow-hidden">
      {!isLandscape && (
        <div className="justify-center items-center h-screen w-screen absolute z-10 flex bg-white">
          <p className="text-2xl text-black">
            {loading ? "Loading ..." : "Please switch to landscape !"}
          </p>
        </div>
      )}
      <FullScreen handle={handle}>
        <div
          className={`flex overflow-hidden flex-col items-center justify-between h-screen w-screen`}
        >
          <PoseData
            poseScore={score}
            detectedPose={posePrediction?.className}
            className="absolute left-0 top-5 z-20"
          />
          <PoseControls
            openFullScreen={handle.enter}
            closeFullScreen={handle.exit}
            isFullScreen={handle.active}
            onHelperOpen={onYogaHelperOpen}
            className="absolute right-5 bottom-5 z-20"
          />
          <AngleSwitch
            onValueChange={setShowAngleTable}
            className="absolute right-0 top-5 z-20 hidden lg:flex"
          />
          <Webcam
            id="video"
            className="h-full z-10"
            ref={webcamRef}
            onUserMedia={(userMedia) => setUserMedia(userMedia)}
            mirrored
            videoConstraints={videoConstraints}
          />
          <WebcamBackground videoConstraints={videoConstraints} />
          {webcamRef.current?.video && (
            <LandMarkCanvas
              className={`absolute -scale-x-100 h-full z-10 ${
                isLandscape ? "absolute" : "hidden"
              }`}
              poses={poses}
              drawPosePrediction={score > 35}
              posePrediction={posePrediction}
              video={webcamRef.current.video}
              canvasHeight={webcamRef.current.video.videoHeight}
              canvasWidth={webcamRef.current.video.videoWidth}
            />
          )}
        </div>
        <YogaPosesHelperModal
          isOpen={isYogaHelperOpen}
          onOpenChange={onYogaHelperOpenChange}
        />
        {showAngleTable && poses.length > 0 && posePrediction && (
          <DebugTable
            posePrediction={posePrediction}
            poseAngles={calculatePoseAngles(poses[0])}
            poseAnglesGoal={getPerfectPoseAngles(posePrediction)}
            className="absolute bottom-5 left-0 z-20 w-96 hidden lg:block"
          />
        )}
      </FullScreen>
    </main>
  );
}
