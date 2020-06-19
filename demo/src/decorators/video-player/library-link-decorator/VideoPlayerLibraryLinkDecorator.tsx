// @ts-ignore
const Component = amp.getComponent('Component');

class VideoPlayerLibraryLinkDecorator extends Component {
  node: HTMLElement;

  constructor(player, options) {
    // @ts-ignore
    super(player, options);

    player.on('ended', () => {
      const libraryLinkElement = document.getElementById('videxVPLibraryLink');
      if (libraryLinkElement !== null) {
        libraryLinkElement.classList.remove('videx-remove-library-link');
      } else {
        const node: HTMLElement = document.createElement('a');
        node.className = 'videx-video-player-library-link';
        node.innerHTML = 'Back to Lessons';
        const sliceIndex = window.location.href.indexOf('/lesson/');
        const newURL = window.location.href.slice(0, sliceIndex);
        node.setAttribute('href', newURL);
        node.setAttribute('id', 'videxVPLibraryLink');
        player.el().insertBefore(node, player.controlBar.el());
      }
    });

    player.on('playing', () => {
      const libraryLinkElement = document.getElementById('videxVPLibraryLink');
      if (libraryLinkElement !== null) {
        libraryLinkElement.classList.add('videx-remove-library-link');
      }
    });
  }
}

Component.registerComponent(
  'VideoPlayerLibraryLinkDecorator',
  VideoPlayerLibraryLinkDecorator
);

export default VideoPlayerLibraryLinkDecorator;
