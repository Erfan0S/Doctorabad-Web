import videojs from "video.js";

export type VideoPlayer = ReturnType<typeof videojs>;

export type VideoPlayerCustomButtonOptions = {
  initialContent: string;
  onClick: (
    player: VideoPlayer,
    updateContent: (content: string) => void,
  ) => void;
  className?: string;
};

export type VideoMissionParams = {
  lesson_id: number;
  current_time: number;
  video_speed: number;
  transaction_type: VideoMissionTransactionType;
  jumped_from_time?: number;
};

export enum VideoMissionTransactionType {
  NEW = "new",
  CONTINUE = "continue",
  SPEED_CHANGE = "speed_change",
}
