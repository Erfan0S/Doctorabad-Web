import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/http-streaming";
import "videojs-contrib-quality-levels";
import "videojs-mobile-ui";

import { VideoConfig } from "@/components/course/video-player";
import TitleBar from "@/components/course/video-player/videoPlayerCustomElements/TitleBar";

// @ts-ignore
videojs.registerComponent("TitleBar", TitleBar);

export class PlayerInitiator {
  public player: ReturnType<typeof videojs> | null = null;
  public qualityLevels: any = [];
  constructor(
    private container: HTMLDivElement,
    private config: VideoConfig,
  ) {}

  static getSources(config: VideoConfig) {
    const sourceTypes = {
      hls: "application/x-mpegURL",
      dash: "application/dash+xml",
      source: "video/mp4",
    };
    const sources: any = [];
    for (const [key, value] of Object.entries(sourceTypes)) {
      if (config[key as keyof typeof config]) {
        sources.push({ src: config[key as keyof typeof config], type: value });
      }
    }
    return sources;
  }

  init() {
    return new Promise((resolve, reject) => {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      // ✅ Add playsinline attribute for iOS
      videoElement.setAttribute("playsinline", "");
      videoElement.setAttribute("webkit-playsinline", "");
      this.container.appendChild(videoElement);

      this.player = videojs(videoElement, {
        controls: true,
        titleBar: {
          title: "sss",
        },
        fluid: true,
        html5: {
          vhs: {
            // HLS Support
            overrideNative: !videojs.browser.IS_SAFARI,
            enableLowInitialPlaylist: true,
            smoothQualityChange: true,
          },
          dash: {
            // DASH Support
            overrideNative: true,
          },
          // ✅ Enable native controls on iOS for proper fullscreen
          nativeControlsForTouch: false,
        },

        playbackRates: [0.5, 1, 1.5, 2],
        controlBar: {
          playToggle: true,
          // disable picture in picture
          pictureInPictureToggle: false,
          skipButtons: {
            forward: 10,
            backward: 10,
          },
          responsive: true,
          volumePanel: false,
        },
        sources: PlayerInitiator.getSources(this.config),
      });

      // ✅ Mobile UI Plugin (handles iOS fullscreen properly)
      // @ts-ignore
      this.player.mobileUi({
        fullscreen: {
          enterOnRotate: true, // Enter fullscreen when device rotates to landscape
          exitOnRotate: true, // Exit fullscreen when device rotates to portrait
          lockOnRotate: true, // Lock orientation in fullscreen
          iOS: true, // Enable iOS-specific handling
        },
        touchControls: {
          seekSeconds: 10, // Double-tap left/right to skip 10 seconds
          tapTimeout: 300, // Tap sensitivity
          disableOnEnd: false, // Keep controls active when video ends
        },
      });

      // ✅ Add iOS-specific fullscreen handling
      if (videojs.browser.IS_IOS || videojs.browser.IS_SAFARI) {
        this.player.on("fullscreenchange", () => {
          if (this.player!.isFullscreen()) {
            // Force landscape orientation on iOS fullscreen
            const videoEl = this.player!.el().querySelector("video");
            if (videoEl) {
              videoEl.style.objectFit = "contain";
            }
          }
        });
      }

      this.player.ready(() => {
        // @ts-ignore
        this.qualityLevels = this.player.qualityLevels();
        resolve(this.player);
      });
    });
  }
}
