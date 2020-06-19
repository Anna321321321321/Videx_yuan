import { Button } from 'antd';
import { Card } from 'semantic-ui-react';
import React, { Component, Fragment } from 'react';

export default class PublicationCard extends Component {
  render() {
    return (
      <Fragment>
        <Card style={{ padding: '10px', borderRadius: 0, width: '100%', marginBottom: '20px' }}>
          <h3>
            <a href={this.props.path}>
              {this.props.header}
            </a>
          </h3>
          <p>{this.props.meta}</p>
          <p>{this.props.description}</p>
        </Card>
      </Fragment>
    );
  }
}
