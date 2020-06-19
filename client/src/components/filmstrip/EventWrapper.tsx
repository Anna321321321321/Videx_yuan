import _ from 'lodash';
import React, { ReactElement } from 'react';
import { compose, onlyUpdateForKeys, withHandlers, withState } from 'recompose';
import * as Logger from 'videx/client/logger';
import * as FilmstripCore from '../../core/filmstrip';

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
  _onMouseMoveCapture?: () => void;
  setFilmstripHoverCount: (filmstripHoverCount: number) => void;
  filmstripHoverCount: number;
  oldMouseClientX: number;
  setMouseClientX: (oldMouseClientX: number) => void;
  setLog: (event: any) => void;
}

// log throttle with inversion of control
// filmstripHoverCount, and oldMouseClientX are state variables for react component
// setFilmstripHoverCount and setMouseClientX are handlers used to change state variables
const logThrottle = _.throttle(
  (
    event,
    filmstripHoverCount,
    setFilmstripHoverCount,
    oldMouseClientX,
    setMouseClientX
  ) => {
    setFilmstripHoverCount(filmstripHoverCount + 1);
    if (event.nativeEvent !== null) {
      if (filmstripHoverCount > 1) {
        if (oldMouseClientX > event.nativeEvent.clientX) {
          Logger.event('Filmstrip.Seeking.Left', {
            mousePositionX: event.nativeEvent.clientX,
            mousePositionY: event.nativeEvent.clientY
          });
        } else {
          Logger.event('Filmstrip.Seeking.Right', {
            mousePositionX: event.nativeEvent.clientX,
            mousePositionY: event.nativeEvent.clientY
          });
        }
        setMouseClientX(event.nativeEvent.clientX);
      }
    }
  },
  500,
  {
    leading: true,
    trailing: false
  }
);

const mouseMoveThrottle = _.throttle(
  (time, onMouseEvent) => {
    onMouseEvent(time, 'filmstrip', 'inprogress');
  },
  50,
  {
    leading: true,
    trailing: true
  }
);

const enhance = compose(
  withState('filmstripHoverCount', 'setFilmstripHoverCount', 0),
  withState('oldMouseClientX', 'setMouseClientX', 0),
  onlyUpdateForKeys([
    'segment',
    'width',
    'isActive',
    'isPositionOutside',
    'position',
    'children',
    'oldMouseClientX',
    'filmstripHoverCount'
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
      Logger.event('Filmstrip.Click.Start', { time: time });
      props.onMouseEvent(time, 'filmstrip', 'start');
    },
    _onMouseMove: props => () => {
      const { segment, width, position } = props;
      const time = FilmstripCore.helpers.pixels2timestamp(
        position.x,
        segment,
        width
      );
      mouseMoveThrottle(time, props.onMouseEvent);
      // props.onMouseEvent(time, 'filmstrip', 'inprogress');
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
        Logger.event('Filmstrip.Click.End', { time: time });
        props.onMouseEvent(time, 'filmstrip', 'end');
      }
    },
    _onMouseMoveCapture: props => e => {
      e.persist();
      logThrottle(
        e,
        props.filmstripHoverCount,
        props.setFilmstripHoverCount,
        props.oldMouseClientX,
        props.setMouseClientX
      );
    }
  })
);

export default enhance((props: EventWrapperProps) => (
  <div
    onMouseMove={props._onMouseMove}
    onMouseMoveCapture={props._onMouseMoveCapture} //used for logging of Filmstrip
    onMouseLeave={() => {
      if (props.filmstripHoverCount > 1) {
        Logger.event('Filmstrip.Seeking.Stop');
      }
      props.setFilmstripHoverCount(0);
      props.setMouseClientX(null);
    }}
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
