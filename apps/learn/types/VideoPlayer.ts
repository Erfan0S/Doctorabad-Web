import videojs from "video.js";

export type VideoPlayer = ReturnType<typeof videojs>;

export type VideoPlayerCustomButtonOptions = {
    initialContent:string,
    onClick:(player:VideoPlayer,updateContent:(content:string)=>void)=>void,
    className?:string,
  }
