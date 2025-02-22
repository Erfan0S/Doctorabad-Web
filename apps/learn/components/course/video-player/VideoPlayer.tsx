import React, { useEffect, useRef, useState } from "react";

import styles from "./VideoPlayer.module.scss";
import { VideoPlayerProps } from "./types";
import { PlayerInitiator } from "@/utils/videoPlayer/playerInitiator";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import CustomButton from "./videoPlayerCustomElements/CustomButton";

const VideoPlayer: React.FC<VideoPlayerProps> = ({ config, className }) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
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
        onClick: () => {
          modalActions.addModal(ModalTypes.VIDEO_QUALITY_SELECTOR, {
            player: playerRef.current,
            selectedQualityLevelIndex: 0,
          });
        },
      });

      // Add the button to the header container
      headerContainer.appendChild(qualitySelectorButton.el());

      setIsPlayerReady(true);
    });

    playerRef.current = playerInitiator.player;

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, []);

  return (
    <div>
      <div className="buttons" ref={buttonsRef}></div>
      <div
        className={`${styles.videoContainer} ${className || ""}`}
        ref={videoRef}
      ></div>
    </div>
  );
};

export default VideoPlayer;
