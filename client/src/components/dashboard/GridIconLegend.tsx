import React, { Fragment } from 'react';
import { Icon } from 'semantic-ui-react';

export default () => (
  <Fragment>
    <Icon name="stop" size="large" style={{ color: '#d6e685' }} />
    <span className="videx-calendar-grid-guide">0-25%</span> &nbsp;
    <Icon name="stop" size="large" style={{ color: '#8cc665' }} />
    <span className="videx-calendar-grid-guide">25-50%</span>&nbsp;
    <Icon name="stop" size="large" style={{ color: '#44a340' }} />
    <span className="videx-calendar-grid-guide">50-75%</span>&nbsp;
    <Icon name="stop" size="large" style={{ color: '#1e6823' }} />
    <span className="videx-calendar-grid-guide">75-100%</span>&nbsp;
    <Icon name="stop" size="large" style={{ color: '#3094c2' }} />
    <span className="videx-calendar-grid-guide">Filtered Lesson(s)</span>
  </Fragment>
);
