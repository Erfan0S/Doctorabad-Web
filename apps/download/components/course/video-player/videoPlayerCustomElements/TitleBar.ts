import videojs from "video.js";


// Get the Component base class from Video.js
const Component = videojs.getComponent('Component');

class TitleBar extends Component {

  // The constructor of a component receives two arguments: the
  // player it will be associated with and an object of options.
  constructor(player:any, options = {title:""}) {

    // It is important to invoke the superclass before anything else, 
    // to get all the features of components out of the box!
    super(player, options as any);

    // If a `text` option was passed in, update the text content of 
    // the component.
    if (options.title) {
      this.updateTextContent(options.title);
    }
  }

  // The `createEl` function of a component creates its DOM element.
  createEl() {
    return videojs.dom.createEl('div', {

      // Prefixing classes of elements within a player with "vjs-" 
      // is a convention used in Video.js.
      className: 'vjs-title-bar'
    });
  }

  // This function could be called at any time to update the text 
  // contents of the component.
  updateTextContent(text:string) {

    // If no text was provided, default to "Title Unknown"
    if (typeof text !== 'string') {
      text = 'Title Unknown';
    }

    this.el().textContent = text;
  }
}

export default TitleBar;