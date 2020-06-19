import React, { Component } from 'react';
import { List, Avatar, Button, Spin } from 'antd';

export default class ExperimentList extends Component {
  render() {
    if (this.props.experiments) {
      return (
        <List
          itemLayout="horizontal"
          dataSource={this.props.experiments}
          renderItem={experiment => (
            <List.Item
              actions={[
                <Button onClick={() => this.props.onDelete(experiment.id)}>
                  Delete
                </Button>
              ]}
            >
              <List.Item.Meta title={experiment.name} />
            </List.Item>
          )}
        />
      );
    } else {
      return (
        <div
          style={{
            textAlign: 'center',
            margin: 'auto auto'
          }}
        >
          <Spin size={'large'} />
        </div>
      );
    }
  }
}
