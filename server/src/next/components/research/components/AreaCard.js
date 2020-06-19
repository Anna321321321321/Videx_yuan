import { Row, Col } from 'antd';
import React, { Component, Fragment } from 'react';
import Carousel from 'nuka-carousel';
import { researchCard, researchCarouselItem } from './styles';
import MediaQuery from 'react-responsive';

export default class AreaCard extends Component {
  render() {
    return (
      <Fragment>
        <style jsx>{researchCard}</style>
        <style jsx>{researchCarouselItem}</style>
        <div className="researchCard">
          <Row>
            <MediaQuery minWidth={768}>
              <Col
                span={12}
                style={{ backgroundColor: this.props.backgroundColor }}
              >
                <div className="research-carousel-item">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <h2 style={{ color: 'white' }}>{this.props.title}</h2>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p style={{ color: 'white' }}>
                            {this.props.description}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a style={{ color: 'white' }}>Read more</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </MediaQuery>
            <MediaQuery minWidth={300} maxWidth={767}>
              <Col
                span={24}
                style={{ backgroundColor: this.props.backgroundColor }}
              >
                <div className="research-carousel-item">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <h2 style={{ color: 'white' }}>{this.props.title}</h2>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p style={{ color: 'white' }}>
                            {this.props.description}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a style={{ color: 'white' }}>Read more</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </MediaQuery>
            <MediaQuery minWidth={768}>
              <Col span={12}>
                <div className="research-carousel-item">
                  <img src={this.props.imgSrc} />
                </div>
              </Col>
            </MediaQuery>
          </Row>
        </div>
      </Fragment>
    );
  }
}
