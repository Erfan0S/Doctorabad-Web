import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./VideoPlayer.module.scss";
import { VideoPlayerProps } from "./types";
import { PlayerInitiator } from "@/utils/videoPlayer/playerInitiator";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import CustomButton from "./videoPlayerCustomElements/CustomButton";

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  config,
  className,
  title,
  isUserHasAccess,
  lessonId,
  goToNextTrack,
  goToPreviousTrack,
}) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const titleRef = useRef<{ updateTextContent: (title: string) => void }>();
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    if (!videoRef.current || playerRef.current) return;

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

      // Create and add the custom button
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

      if (isUserHasAccess) {
        const addNoteButton = new CustomButton(player, {
          initialContent: "یادداشت",
          className: "vjs-custom-button",
          onClick: (player) => {
            player.pause();
            player.exitFullscreen();
            modalActions.addModal(ModalTypes.ADD_NOTE, {
              currentTime: player.currentTime(),
              lessonId,
            });
          },
        });
        headerContainer.appendChild(addNoteButton.el());
      }

      const nextTrackButton = new CustomButton(player, {
        initialContent: "",
        className: "vjs-icon-next-item",
        onClick: goToNextTrack,
      });
      const previousTrackButton = new CustomButton(player, {
        initialContent: "",
        className: "vjs-icon-previous-item",
        onClick: goToPreviousTrack,
      });
      player.getChild("ControlBar")!.addChild(previousTrackButton, {}, 3);
      player.getChild("ControlBar")!.addChild(nextTrackButton, {}, 4);

      headerContainer.appendChild(qualitySelectorButton.el());

      titleRef.current = player.getChild("TitleBar") as unknown as {
        updateTextContent: (title: string) => void;
      };
      setIsPlayerReady(true);
    });

    playerRef.current = playerInitiator.player;

    playerRef.current.on("ended", () => {
      goToNextTrack();
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (!isPlayerReady) return;
    titleRef.current?.updateTextContent(title || "");
  }, [title, isPlayerReady]);

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
