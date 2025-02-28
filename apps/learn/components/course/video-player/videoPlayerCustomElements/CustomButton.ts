import { VideoPlayerCustomButtonOptions } from "@/types/VideoPlayer";
import videojs from "video.js";

// Get the Button component class from Video.js
const Button = videojs.getComponent("Button");



// Create a custom button class extending the base Button component
class CustomButton extends Button {
  private onClick:VideoPlayerCustomButtonOptions["onClick"];
  constructor(player: any, options:VideoPlayerCustomButtonOptions) {
    super(player, {});

    this.onClick = options.onClick;



    if (options.className) {
      this.addClass(options.className);
    }
    this.updateContent(options.initialContent);
  }

  updateContent = (content:string)=>{
        // @ts-ignore
        this.controlText(content);
    // @ts-ignore
    videojs.dom.emptyEl(this.el());
    // @ts-ignore
    videojs.dom.appendContent(this.el(), content);
  }

  // Handle click events on the button
  handleClick() {
    // videojs update time to next 10 seconds
    // this.player().currentTime(this.player().currentTime()! + 10);

    // videojs set speed to 1.5
    // this.player().playbackRate(1.5);

    this.onClick(this.player(), this.updateContent);
  }

  // Optional: Override the button's CSS class name
  buildCSSClass() {
    return `${super.buildCSSClass()}`;
  }
}

// Register the component with Video.js
(videojs as any).registerComponent("CustomButton", CustomButton);

export default CustomButton; 