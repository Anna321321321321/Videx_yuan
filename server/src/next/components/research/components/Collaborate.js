import React, { Component, Fragment } from 'react';
import { Row, Col } from 'antd';
import { collaborate } from './styles';

export default class Collaborate extends Component {
  render() {
    return (
      <section id="collaborate">
        <style jsx>{collaborate}</style>
        <Row style={{ height: '40vh' }}>
          <Col span={12} style={{ backgroundColor: '#00B7C3', height: '100%' }}>
            <div className="collaborateTitle">
              <h1 style={{ color: '#fff' }}>Collaborate</h1>
            </div>
          </Col>
          <Col span={12} style={{ height: '40vh' }}>
            <div className="collaborateDescription">
              <h3>Contact us at videx@ece.ubc.ca</h3>
            </div>
          </Col>
        </Row>
      </section>
    );
  }
}
