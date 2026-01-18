import { isMobile } from "@/util/isMobile";

export class Camera {
  video: HTMLVideoElement;

  constructor() {
    this.video = document.getElementById("video") as HTMLVideoElement;
  }

  /**
   * Initiate a Camera instance and wait for the camera stream to be ready.
   * @param cameraParam From app `STATE.camera`.
   */
  static async setup(webcamStream: MediaStream) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        "Browser API navigator.mediaDevices.getUserMedia not available"
      );
    }

    const stream = webcamStream;

    const camera = new Camera();
    camera.video.srcObject = stream;

    await new Promise<void>((resolve) => {
      camera.video.onloadedmetadata = () => {
        resolve();
      };
    });

    camera.video.play();

    return camera;
  }
}
