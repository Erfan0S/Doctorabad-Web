import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styles from "./VideoPlayer.module.scss";
import { VideoPlayerProps } from "./types";
import { PlayerInitiator } from "@/utils/videoPlayer/playerInitiator";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import CustomButton from "./videoPlayerCustomElements/CustomButton";
import {
  VideoMissionTransactionType,
  VideoPlayer as VideoPlayerType,
} from "@/types/VideoPlayer";
import { VideoQualitySelector } from "../videoQualitySelectorModal/VideoQualitySelector";
import AddLeasonNoteModal from "./addNoteModal/AddLeasonNoteModal";
import Watermark from "../watermark";
import Loading from "@/components/common/Loading";
import { api } from "@/api/Api";
import { LessonVideoContext } from "@/context/LessonVideoContext";

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  config,
  className,
  title,
  isUserHasAccess,
  lessonId,
  goToNextTrack,
  goToPreviousTrack,
  courseId,
}) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<VideoPlayerType>();
  const lessonIdRef = useRef(lessonId);
  const courseIdRef = useRef(courseId);
  const isVideoPlayedRef = useRef(false);
  const previousTimeRef = useRef(-1);
  const missionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { currentLeasson, clearBookmark, bookmark } =
    useContext(LessonVideoContext);

  lessonIdRef.current = lessonId;
  courseIdRef.current = courseId;

  const [isWatermarkActive, setIsWatermarkActive] = useState(false);

  const handleMission = useCallback(
    (transactionType: VideoMissionTransactionType) => {
      if (lessonIdRef.current) {
        api.videoMission({
          lesson_id: lessonIdRef.current,
          current_time: Math.floor(playerRef.current?.currentTime() || 0),
          video_speed: Math.floor(playerRef.current?.playbackRate() || 1),
          transaction_type: transactionType,
          jumped_from_time:
            previousTimeRef.current >= 0
              ? Math.floor(previousTimeRef.current)
              : undefined,
        });
        previousTimeRef.current = -1;
      }
    },
    [],
  );

  const handleMissionInterval = useCallback(() => {
    if (missionIntervalRef.current) {
      clearInterval(missionIntervalRef.current);
    }
    missionIntervalRef.current = setInterval(() => {
      if (lessonIdRef.current) {
        handleMission(VideoMissionTransactionType.CONTINUE);
      }
    }, 60000);
  }, []);

  const onMoveBackward = useCallback(() => {
    previousTimeRef.current = Math.floor(
      (playerRef.current?.currentTime() || 0) + 10,
    );
    handleMission(VideoMissionTransactionType.CONTINUE);
  }, []);

  const onMoveForward = useCallback(() => {
    previousTimeRef.current = Math.floor(
      (playerRef.current?.currentTime() || 0) - 10,
    );
    handleMission(VideoMissionTransactionType.CONTINUE);
  }, []);

  const handlePlayer = useCallback(
    (player: VideoPlayerType) => {
      playerRef.current = player;
      player.aspectRatio("16:9");
      player.on("play", () => {
        if (lessonIdRef.current && !!player) {
          handleMission(
            isVideoPlayedRef.current
              ? VideoMissionTransactionType.CONTINUE
              : VideoMissionTransactionType.NEW,
          );
          if (!isVideoPlayedRef.current) isVideoPlayedRef.current = true;
        }
        setIsWatermarkActive(true);
        handleMissionInterval();
        console.log("play");
      });
      player.on("pause", () => {
        if (missionIntervalRef.current) {
          clearInterval(missionIntervalRef.current);
        }
      });
      player.on("ended", () => {
        if (missionIntervalRef.current) {
          clearInterval(missionIntervalRef.current);
        }
        setIsWatermarkActive(false);
      });
      player.on("seeking", () => {
        if (missionIntervalRef.current) {
          clearInterval(missionIntervalRef.current);
        }
        previousTimeRef.current = playerRef.current?.currentTime() || 0;
      });

      player.on("ratechange", () => {
        if (missionIntervalRef.current) {
          clearInterval(missionIntervalRef.current);
        }
        if (player && lessonIdRef.current) {
          handleMission(VideoMissionTransactionType.SPEED_CHANGE);
        }
        handleMissionInterval();
      });

      return () => {
        if (missionIntervalRef.current) {
          clearInterval(missionIntervalRef.current);
        }
      };
    },
    [handleMissionInterval, playerRef],
  );
  const titleRef = useRef<{ updateTextContent: (title: string) => void }>();
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const [isQualitySelectorOpen, setIsQualitySelectorOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isLessonChanged, setIsLessonChanged] = useState(false);

  useEffect(() => {
    if (
      !videoRef.current ||
      // !playerRef.current ||
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
            if (player.isFullscreen()) {
              setIsQualitySelectorOpen(true);
            } else {
              modalActions.addModal(ModalTypes.VIDEO_QUALITY_SELECTOR, {
                player: playerRef.current,
                selectedQualityLevelIndex: 0,
              });
            }
          },
        });
        headerContainer.appendChild(qualitySelectorButton.el());
      }

      titleRef.current = player.getChild("TitleBar") as unknown as {
        updateTextContent: (title: string) => void;
      };
      setIsPlayerReady(true);
    });

    handlePlayer(playerInitiator.player as VideoPlayerType);

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (isLessonChanged) {
      playerRef.current
        ?.getChild("ControlBar")
        ?.el()
        ?.getElementsByClassName("vjs-skip-backward-10")[0]
        ?.removeEventListener("click", onMoveBackward);

      playerRef.current
        ?.getChild("ControlBar")
        ?.el()
        ?.getElementsByClassName("vjs-skip-forward-10")[0]
        ?.removeEventListener("click", onMoveForward);

      isVideoPlayedRef.current = false;
      previousTimeRef.current = -1;
      if (missionIntervalRef.current) {
        clearInterval(missionIntervalRef.current);
      }
      playerRef.current?.play();
      playerRef.current?.autoplay("play");
    } else {
      setIsLessonChanged(true);
    }
  }, [lessonId]);

  useEffect(() => {
    if (!config || !isPlayerReady) return;

    playerRef.current?.src(PlayerInitiator.getSources(config));
  }, [config]);

  useEffect(() => {
    if (isPlayerReady) {
      playerRef.current
        ?.getChild("ControlBar")
        ?.el()
        ?.getElementsByClassName("vjs-skip-backward-10")[0]
        ?.addEventListener("click", onMoveBackward);

      playerRef.current
        ?.getChild("ControlBar")
        ?.el()
        ?.getElementsByClassName("vjs-skip-forward-10")[0]
        ?.addEventListener("click", onMoveForward);

      playerRef.current?.poster(config?.thumbnail || undefined);
      playerRef.current?.on("timeupdate", () => {
        clearBookmark();
      });
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
            if (player.isFullscreen()) {
              setIsNoteModalOpen(true);
            } else {
              modalActions.addModal(ModalTypes.ADD_NOTE, {
                currentTime: player.currentTime(),
                lessonId: lessonIdRef.current,
                courseId: courseIdRef.current,
              });
            }
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
    if (bookmark?.time) {
      playerRef.current!.currentTime(bookmark.time);
      playerRef.current!.play();
    }
  }, [title, isPlayerReady, bookmark]);

  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      {!isPlayerReady && (
        <div className={styles.palceHolder}>
          <Loading />
        </div>
      )}
      <div
        className={`${styles.videoContainer} ${className || ""}`}
        ref={videoRef}
      ></div>
      {isPlayerReady && [
        createPortal(
          isQualitySelectorOpen ? (
            <VideoQualitySelector
              closeModal={() => setIsQualitySelectorOpen(false)}
              data={{
                player: playerRef.current!,
                selectedQualityLevelIndex: 0,
              }}
            />
          ) : null,
          playerRef.current!.el(),
        ),
        createPortal(
          isNoteModalOpen ? (
            <AddLeasonNoteModal
              closeModal={() => setIsNoteModalOpen(false)}
              data={{
                currentTime: playerRef.current!.currentTime() || 0,
                lessonId,
                courseId,
                showOnPlayer: true,
              }}
            />
          ) : null,
          playerRef.current!.el(),
        ),
        createPortal(
          <Watermark
            active={isWatermarkActive}
            shown={isUserHasAccess && isPlayerReady}
          />,
          playerRef.current!.el(),
        ),
      ]}
    </div>
  );
};

export default VideoPlayer;
