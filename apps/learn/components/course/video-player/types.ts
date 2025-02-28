export interface VideoConfig {
  hls?: string;
  dash?: string;
  player?: string;
  source?: string;
  thumbnail?: string;
}

export interface VideoQuality {
  label: string;
  value: string;
}

export interface VideoPlayerProps {
  config: VideoConfig;
  className?: string;
  title?: string;
  isUserHasAccess: boolean;
  lessonId: number;
  goToNextTrack: () => void;
  goToPreviousTrack: () => void;
}
