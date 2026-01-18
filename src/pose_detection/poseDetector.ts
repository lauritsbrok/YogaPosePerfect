/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-webgpu";

import * as mpPose from "@mediapipe/pose";
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";
import * as tf from "@tensorflow/tfjs-core";

tfjsWasm.setWasmPaths(
  `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`
);

import * as posedetection from "@tensorflow-models/pose-detection";

import { Camera } from "./camera";
import { Pose } from "@tensorflow-models/pose-detection";

export class PoseDetector {
  _detector: posedetection.PoseDetector | undefined;
  _camera: Camera | undefined;

  async init(webcamStream: MediaStream) {
    this._camera = await Camera.setup(webcamStream);

    await tf.ready();
    this._detector = await this.createDetector();
  }

  createDetector() {
    return posedetection.createDetector(
      posedetection.SupportedModels.BlazePose,
      {
        runtime: "mediapipe",
        modelType: "lite",
        solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/pose@${mpPose.VERSION}`,
      }
    );
  }

  async renderResult(): Promise<posedetection.Pose[]> {
    if (this._camera == undefined || this._detector == undefined) return [];
    if (this._camera.video.readyState < 2) {
      await new Promise((resolve) => {
        this._camera!.video.onloadeddata = (video) => {
          resolve(video);
        };
      });
    }

    let poses: Pose[] = [];

    // Detector can be null if initialization failed (for example when loading
    // from a URL that does not exist).
    if (this._detector != null) {
      // FPS only counts the time it takes to finish estimatePoses.
      // Detectors can throw errors, for example when using custom URLs that
      // contain a model that doesn't provide the expected output.
      try {
        poses = await this._detector.estimatePoses(this._camera.video, {
          flipHorizontal: false,
        });
      } catch (error) {
        this._detector.dispose();
        this._detector = undefined;
        alert(error);
      }
    }
    return poses || [];
  }

  async renderPrediction() {
    console.log("started");
    await this.renderResult();
    requestAnimationFrame(this.renderPrediction);
  }
}
