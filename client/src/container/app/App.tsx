import * as React from 'react';
import * as Logger from 'videx/client/logger';
import _ from 'lodash';

Logger.event('App.Load');

let attached = false;

const eventInit = () => {
  attached = true;
};

if (!attached) {
  eventInit();
  window.addEventListener('focus', () => {
    Logger.event('ActiveVideo.Visible');
  });

  window.addEventListener('blur', () => Logger.event('ActiveVideo.Hidden'));

  window.addEventListener(
    'beforeunload',
    function(event) {
      Logger.event('Player.Exit');
    },
    false
  );
  window.addEventListener('mousemove', function(event) {
    mouseLogThrottle(event);
  });
}

const mouseLogThrottle = _.throttle(
  event => {
    Logger.event('MouseMove', {
      mousePositionX: event.clientX,
      mousePositionY: event.clientY,
      elementName: event.target.tagName,
      elementText: event.target.innerText,
      elementId: event.target.id
    });
  },
  5000,
  { leading: true, trailing: false }
);

export default props => props.children;
