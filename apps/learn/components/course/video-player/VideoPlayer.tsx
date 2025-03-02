import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./VideoPlayer.module.scss";
import { VideoPlayerProps } from "./types";
import { PlayerInitiator } from "@/utils/videoPlayer/playerInitiator";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import CustomButton from "./videoPlayerCustomElements/CustomButton";
import { VideoPlayer as VideoPlayerType } from "@/types/VideoPlayer";

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  config,
  className,
  title,
  isUserHasAccess,
  lessonId,
  goToNextTrack,
  goToPreviousTrack,
  suggestedCurrentTime,
  courseId,
}) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<VideoPlayerType>();
  const titleRef = useRef<{ updateTextContent: (title: string) => void }>();
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    if (
      !videoRef.current ||
      playerRef.current ||
      !config ||
      !Object.values(config).length
    )
      return;

    const playerInitiator = new PlayerInitiator(videoRef.current, config);
    playerInitiator.init().then(() => {
      if (!playerInitiator.player) return;

      // Create a header container if it doesn't exist
      const player = playerInitiator.player;
      let headerContainer = player.el().querySelector(".vjs-header-buttons");

      if (!headerContainer) {
        headerContainer = document.createElement("div");
        headerContainer.className = "vjs-header-buttons";
        // Insert the header container at the beginning of the player
        player.el().insertBefore(headerContainer, player.el().firstChild);
      }

      const isVideoHasMultipleQuality = config.dash || config.hls;

      if (isVideoHasMultipleQuality) {
        const qualitySelectorButton = new CustomButton(player, {
          initialContent: "کیفیت",
          className: "vjs-custom-button",
          onClick: () => {
            player.exitFullscreen();

            modalActions.addModal(ModalTypes.VIDEO_QUALITY_SELECTOR, {
              player: playerRef.current,
              selectedQualityLevelIndex: 0,
            });
          },
        });
        headerContainer.appendChild(qualitySelectorButton.el());
      }

      titleRef.current = player.getChild("TitleBar") as unknown as {
        updateTextContent: (title: string) => void;
      };
      setIsPlayerReady(true);
    });

    playerRef.current = playerInitiator.player as VideoPlayerType;

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (!config || !isPlayerReady) return;

    playerRef.current?.src(PlayerInitiator.getSources(config));
  }, [config]);

  useEffect(() => {
    if (isPlayerReady) {
      let noteButton: CustomButton | null = null;
      const nextTrackButton = new CustomButton(playerRef.current!, {
        initialContent: "",
        className: "vjs-icon-next-item",
        onClick: goToNextTrack,
      });
      const previousTrackButton = new CustomButton(playerRef.current!, {
        initialContent: "",
        className: "vjs-icon-previous-item",
        onClick: goToPreviousTrack,
      });
      playerRef
        .current!.getChild("ControlBar")!
        .addChild(previousTrackButton, {}, 3);
      playerRef
        .current!.getChild("ControlBar")!
        .addChild(nextTrackButton, {}, 4);
      playerRef.current!.on("ended", goToNextTrack);

      if (isUserHasAccess) {
        noteButton = new CustomButton(playerRef.current!, {
          initialContent: "یادداشت",
          className: "vjs-custom-button",
          onClick: (player) => {
            player.pause();
            player.exitFullscreen();
            modalActions.addModal(ModalTypes.ADD_NOTE, {
              currentTime: player.currentTime(),
              lessonId,
              courseId,
            });
          },
        });
        let headerContainer = playerRef
          .current!.el()
          .querySelector(".vjs-header-buttons");
        headerContainer?.appendChild(noteButton.el());
      }

      return () => {
        if (nextTrackButton) {
          nextTrackButton.dispose();
        }
        if (previousTrackButton) {
          previousTrackButton.dispose();
        }
        if (noteButton) {
          noteButton.dispose();
        }
        playerRef.current!.off("ended", goToNextTrack);
      };
    }
  }, [config, isPlayerReady]);

  useEffect(() => {
    if (!isPlayerReady) return;
    titleRef.current?.updateTextContent(title || "");
    if (suggestedCurrentTime) {
      playerRef.current!.currentTime(suggestedCurrentTime);
      playerRef.current!.play();
    }
  }, [title, isPlayerReady, suggestedCurrentTime]);

  return (
    <div>
      <div
        className={`${styles.videoContainer} ${className || ""}`}
        ref={videoRef}
      ></div>
    </div>
  );
};

export default VideoPlayer;
