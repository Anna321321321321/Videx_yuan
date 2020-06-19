// @ts-ignore
const Component = amp.getComponent('Component');

class VideoPlayerControlBarDecorator extends Component {
  constructor(player, options) {
    super(player, options);

    player.ready(() => {
      const controlBarChildren = player.controlBar.children();
      let middleControlBar,
        leftControlBar,
        rightControlBar,
        playbackSkipDiv = null;

      for (let i = 0; i < controlBarChildren.length; i += 1) {
        if (
          controlBarChildren[i].el() &&
          controlBarChildren[i].el().className === 'amp-controlbaricons-middle'
        ) {
          middleControlBar = controlBarChildren[i].el();
        }

        if (
          controlBarChildren[i].el() &&
          controlBarChildren[i].el().className === 'amp-controlbaricons-left'
        ) {
          leftControlBar = controlBarChildren[i].el();
          playbackSkipDiv = document.getElementsByClassName(
            'videx-play-back-skip-decorator'
          )[0];
          leftControlBar.removeChild(playbackSkipDiv);
        }

        if (
          controlBarChildren[i].el() &&
          controlBarChildren[i].el().className === 'amp-controlbaricons-right'
        ) {
          rightControlBar = controlBarChildren[i].el();
        }
      }
      const node: HTMLElement = document.createElement('div');
      node.className = 'amp-controlbaricons-bottom';
      const node2: HTMLElement = document.createElement('div');
      node2.className = 'amp-controlbaricons-bottom-middle';
      player.controlBar.el().removeChild(middleControlBar);
      player.controlBar.el().removeChild(leftControlBar);
      player.controlBar.el().removeChild(rightControlBar);

      player.controlBar
        .el()
        .insertBefore(middleControlBar, player.controlBar.el().firstChild);
      node.appendChild(leftControlBar);
      node2.appendChild(playbackSkipDiv);
      node.appendChild(node2);
      node.appendChild(rightControlBar);
      player.controlBar.el().appendChild(node);
    });
  }
}

Component.registerComponent(
  'VideoPlayerControlBarDecorator',
  VideoPlayerControlBarDecorator
);

export default VideoPlayerControlBarDecorator;
