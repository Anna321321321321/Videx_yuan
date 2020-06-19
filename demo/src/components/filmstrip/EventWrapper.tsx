import _ from 'lodash';
import React, { ReactElement } from 'react';
import { compose, onlyUpdateForKeys, withHandlers } from 'recompose';
import * as FilmstripCore from '../../core/filmstrip';

const enhance = compose(
  onlyUpdateForKeys([
    'segment',
    'width',
    'isActive',
    'isPositionOutside',
    'position',
    'children'
  ]),
  withHandlers({
    _onMouseDown: props => e => {
      e.preventDefault();
      e.stopPropagation();
      const { segment, width, position } = props;
      const time = FilmstripCore.helpers.pixels2timestamp(
        position.x,
        segment,
        width
      );
      props.onMouseEvent(time, 'filmstrip', 'start');
    },
    _onMouseMove: props => () => {
      const { segment, width, position } = props;
      const time = FilmstripCore.helpers.pixels2timestamp(
        position.x,
        segment,
        width
      );
      props.onMouseEvent(time, 'filmstrip', 'inprogress');
    },
    _onMouseUp: props => e => {
      e.preventDefault();
      e.stopPropagation();
      if (e.button !== 2) {
        const { segment, width, position } = props;
        const time = FilmstripCore.helpers.pixels2timestamp(
          position.x,
          segment,
          width
        );
        props.onMouseEvent(time, 'filmstrip', 'end');
      }
    }
  })
);

interface EventWrapperProps {
  segment: {
    start: number;
    end: number;
  };
  width: number;
  isActive?: boolean;
  isPositionOutside?: boolean;
  position?: {
    x: number;
    y: number;
  };
  children: ReactElement<any>[];
  onMouseEvent: (time: number, source: string, event: string) => void;
  _onMouseDown?: () => void;
  _onMouseMove?: () => void;
  _onMouseUp?: () => void;
}

export default enhance((props: EventWrapperProps) => (
  <div
    onMouseMove={_.throttle(() => props._onMouseMove(), 1000, {
      leading: true,
      maxWait: 500,
      trailing: true
    })}
    onMouseUp={props._onMouseUp}
    onMouseDown={props._onMouseDown}
  >
    {React.Children.map(props.children, child =>
      React.cloneElement(child as ReactElement<any>, {
        isActive: props.isActive,
        isPositionOutside: props.isPositionOutside,
        position: props.position
      })
    )}
  </div>
));
