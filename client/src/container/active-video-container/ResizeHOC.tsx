import _ from 'lodash';
import { compose, withHandlers, withProps, withState } from 'recompose';
import * as Logger from 'videx/client/logger';
import * as LocalStorage from '../../system/local-storage';

export default compose(
  withState(
    'layoutFlexs',
    'setLayoutFlexs',
    LocalStorage.getItem(LocalStorage.LocalStorageKeys.ACTIVE_VIDEO_LAYOUT, {
      transcript: 0.4,
      player: 0.6
    })
  ),
  withHandlers({
    onResize: props => event => {
      const layoutFlexs = props.layoutFlexs;
      const { name, flex } = event.component.props;
      if (name === 'transcript') {
        layoutFlexs.player = 1 - flex;
        layoutFlexs.transcript = flex;
      } else {
        layoutFlexs.transcript = 1 - flex;
        layoutFlexs.player = flex;
      }
      props.setLayoutFlexs(layoutFlexs);
      LocalStorage.setItem(
        LocalStorage.LocalStorageKeys.ACTIVE_VIDEO_LAYOUT,
        layoutFlexs
      );
      Logger.event('ActiveVideo.Resize', { source: name });
    }
  }),
  withProps(props => ({
    layoutFlexs: props.layoutFlexs,
    onResize: props.onResize
  }))
);
