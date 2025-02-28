import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/http-streaming";
import "videojs-contrib-quality-levels";

import { VideoPlayerProps } from "@/components/course/video-player";
import TitleBar from "@/components/course/video-player/videoPlayerCustomElements/TitleBar";

// @ts-ignore
videojs.registerComponent('TitleBar', TitleBar);

export class PlayerInitiator {

    public player: ReturnType<typeof videojs> | null = null;
    public qualityLevels: any = [];
    constructor(private container: HTMLDivElement,private config:VideoPlayerProps["config"]) {}


    getSources() {
        const sourceTypes = {hls: "application/x-mpegURL", dash: "application/dash+xml", source: "video/mp4"};
        const sources = [];
        for (const [key, value] of Object.entries(sourceTypes)) {
            if (this.config[key as keyof typeof this.config]) {
                sources.push({ src: this.config[key as keyof typeof this.config], type: value });
            }
        }
        return sources;
    }

    init() {

      

        return new Promise((resolve, reject) => {
        const videoElement = document.createElement("video-js");
        videoElement.classList.add("vjs-big-play-centered");
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
          },
          playbackRates: [0.5, 1, 1.5, 2],
          controlBar: {
            playToggle:true,
            // disable picture in picture
            pictureInPictureToggle: false,
            skipButtons: {
              forward: 10,
              backward: 10,

            },
            responsive: true,
            volumePanel: false,
          },
          sources:this.getSources(),
        }  );
        this.player.ready(() => {
            // @ts-ignore
            this.qualityLevels = this.player.qualityLevels();
            resolve(this.player);
        });
        });
    }
}