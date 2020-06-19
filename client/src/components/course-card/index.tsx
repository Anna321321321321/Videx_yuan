import { Button, Card, Icon, message, Modal, Popover } from 'antd';
import React, { PureComponent } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router';
import * as Logger from 'videx/client/logger';

// TODO: https://github.com/OneNoteDev/ViDeX/issues/914
export interface CourseCardProps {
  name: string;
  metadata: {
    token: string;
    ownerAccess: boolean;
  };
  id: string;
  onDeleteCallback: Function;
}

export default class CourseCard extends PureComponent<CourseCardProps, any> {
  render() {
    return (
      <div
        style={{
          position: 'relative',
          marginBottom: '20px'
        }}
      >
        <Link
          onClick={() => {
            Logger.event('CourseCard.Click', { courseId: this.props.id });
          }}
          to={`/course/${this.props.id}`}
        >
          <Card
            bodyStyle={{
              padding: '15px'
            }}
            style={{
              // vertical and horizontal center
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100px'
            }}
          >
            <div
              style={{
                fontSize: '21px',
                color: '#4183c4',
                textOverflow: 'ellipsis',
                overflow: 'hidden'
              }}
            >
              {this.props.name}
            </div>
          </Card>
        </Link>
        {this.props.metadata.ownerAccess && (
          <Button.Group
            style={{
              position: 'absolute',
              top: '0px',
              right: '0px'
            }}
            size={'small'}
          >
            <Button>
              <Link
                onClick={() => {
                  Logger.event('CourseCard.Edit.Click', {
                    courseId: this.props.id
                  });
                }}
                to={`/course/${this.props.id}/edit`}
              >
                <Icon
                  type="edit"
                  style={{
                    marginRight: '8px'
                  }}
                />
                Edit
              </Link>
            </Button>
            <Button
              onClick={() => {
                this.props.onDeleteCallback();
              }}
            >
              <Icon
                type="delete"
                style={{
                  marginRight: '8px'
                }}
              />
              Delete
            </Button>
            <Button
              onClick={() => {
                Modal.info({
                  title: 'Share Course',
                  content: (
                    <div>
                      <p>Please copy and share the link with your students.</p>
                      <CopyToClipboard
                        text={`https://${window.location.host}/register?token=${
                          this.props.metadata.token
                        }`}
                        onCopy={() => message.success('Copied')}
                      >
                        <Button icon="copy">Copy</Button>
                      </CopyToClipboard>
                    </div>
                  )
                });
              }}
            >
              <Icon
                type="share-alt"
                style={{
                  marginRight: '8px'
                }}
              />
              Share
            </Button>
          </Button.Group>
        )}
      </div>
    );
  }
}
