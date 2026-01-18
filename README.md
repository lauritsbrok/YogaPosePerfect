# YogaPosePerfect

Real-time yoga pose feedback in the browser, built with Next.js and
TensorFlow.js.

![YogaPosePerfect demo](doc/demo.gif)

## Overview
YogaPosePerfect detects your pose from a webcam feed, predicts which yoga pose
you are attempting, and scores your alignment against curated "perfect" joint
angles. It overlays keypoints, skeletons, and pose outlines on top of the live
video so you can adjust in real time.

## Motivation
This project grew out of a thesis exploring how computer vision can make yoga
practice more accessible by offering instant, in-browser feedback without
special hardware.

## Features
- Real-time pose detection using BlazePose via the MediaPipe runtime
- Pose classification across four poses: Downward-Facing Dog, Four-Limbed
  Staff, Tree Pose, and Warrior II
- Angle-based scoring with a confidence threshold to stabilize predictions
- Visual overlays: skeleton/keypoints and pose outline guides
- Full-screen mode and a helper modal with quick pose video references
- Optional debug angle table on large screens

## How It Works
1. The app requests webcam access and initializes a BlazePose detector.
2. Each frame is processed to extract keypoints (3D if available).
3. Joint angles are computed from related keypoints (shoulders, elbows, hips,
   knees, ankles).
4. The current angles are compared against a curated set of target angles for
   each supported pose.
5. The best-matching pose and its score are displayed once predictions are
   stable, and an outline guide is rendered when the score is high enough.

## Run It Locally
```bash
npm install
npm run dev
```

Then open `http://localhost:3000` and allow camera access. The UI expects a
landscape layout, so rotate your device or resize the browser window if needed.

## Project Structure
- `src/app/page.tsx`: main UI loop and pose pipeline
- `src/pose_detection`: detector + predictor logic
- `src/util`: angle math, scoring, rendering helpers
- `src/shared/components`: UI components and overlays
- `assets`: pose outline SVGs
