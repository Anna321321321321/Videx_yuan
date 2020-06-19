import { Image } from 'semantic-ui-react';
import { Card, Modal } from 'antd';
import { Component, Fragment } from 'react';
import { authorCard } from './styles';
import MediaQuery from 'react-responsive';

export default class AuthorCard extends Component {
  constructor(props) {
    super(props);
    this.state = { showInfo: false };
  }

  handleShow = () => {
    this.setState({ showInfo: !this.state.showInfo });
  };

  render() {
    return (
      <Fragment>
        <style jsx>{authorCard}</style>
        <MediaQuery minWidth={768}>
          <Card
            hoverable
            cover={
              <Image
                fluid={true}
                style={{ borderRadius: '0' }}
                src={this.props.imageSrc}
              />
            }
            onClick={this.handleShow}
            style={{ width: '70%', margin: 'auto' }}
          >
            <Card.Meta
              title={<div className="name">{this.props.name}</div>}
              description={this.props.title}
              style={{ whiteSpace: 'normal!important' }}
            />
          </Card>
        </MediaQuery>
        <MediaQuery maxWidth={767}>
          <Card
            hoverable
            cover={
              <Image
                fluid={true}
                style={{ borderRadius: '0' }}
                src={this.props.imageSrc}
              />
            }
            onClick={this.handleShow}
            style={{ width: '60%', margin: 'auto' }}
          >
            <Card.Meta
              title={<div className="name">{this.props.name}</div>}
              description={this.props.title}
              style={{ whiteSpace: 'normal!important' }}
            />
          </Card>
        </MediaQuery>

        <Modal
          visible={this.state.showInfo}
          width={'50vw'}
          okText={'Back'}
          footer={null}
          closable={true}
          onCancel={this.handleShow}
        >
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <Image style={{ borderRadius: '0' }} src={this.props.imageSrc} />
            </div>
            <div style={{ flex: 1, paddingLeft: '20px' }}>
              <h2>{this.props.name}</h2>
              <p style={{ fontSize: 'medium' }}>{this.props.description}</p>
              <p style={{ fontSize: 'medium' }}>
                Contact: {this.props.contact}
              </p>
            </div>
          </div>
        </Modal>
      </Fragment>
    );
  }
}
