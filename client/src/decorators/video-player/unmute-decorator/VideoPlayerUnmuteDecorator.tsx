// @ts-ignore
const Component = amp.getComponent('Component');

const id = 'videx-video-player-unmute-button';

class VideoPlayerUnmuteDecorator extends Component {
  node: HTMLElement;

  remove() {
    const element = document.getElementById(id);
    if (element !== null) {
      element.parentNode.removeChild(element);
    }
  }

  render(player) {
    const node: HTMLElement = document.createElement('button');
    node.innerHTML = 'Enable Volume';
    node.id = id;
    node.onclick = () => player.muted(false);
    player.el().insertBefore(node, player.controlBar.el());
  }

  constructor(player, options) {
    // @ts-ignore
    super(player, options);

    if (player.muted()) {
      this.render(player);
    }

    player.on('mute', () => {
      this.render(player);
    });

    player.on('unmute', () => {
      this.remove();
    });
  }
}

Component.registerComponent(
  'VideoPlayerUnmuteDecorator',
  VideoPlayerUnmuteDecorator
);

export default VideoPlayerUnmuteDecorator;
