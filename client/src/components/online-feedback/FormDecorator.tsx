import { Modal, Progress, Spin } from 'antd';
import React from 'react';
import { compose, withHandlers, withState } from 'recompose';
import * as Logger from 'videx/client/logger';
import OnlineFeedbackForm from './OnlineFeedbackForm';

const enhance = compose(
  withState('fields', 'setFields', {
    category: { value: null },
    email: { value: null },
    rate: { value: null },
    message: { value: null }
  }),
  withState('status', 'setStatus', null),
  withHandlers({
    onReset: props => () => {
      props.setStatus(null);
      props.setFields({
        category: { value: null },
        email: { value: null },
        rate: { value: null },
        message: { value: null }
      });
    },
    onSubmit: props => async () => {
      Logger.event('OnlineFeedback.Submit', {
        category: props.fields.category.value,
        rate: props.fields.rate.value,
        message: props.fields.message.value
      });
      props.setStatus('active');
      const response = await fetch(
        'https://hooks.slack.com/services/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',
        {
          body: JSON.stringify({
            attachments: [
              {
                fallback: `New Message: ${props.fields.category.value}`,
                color:
                  props.fields.category.value === 'feature'
                    ? 'warning'
                    : props.fields.category.value === 'bug'
                      ? 'danger'
                      : 'good',
                fields: [
                  {
                    title: 'Category',
                    value: props.fields.category.value,
                    short: false
                  },
                  {
                    title: 'E-mail',
                    value: props.fields.email.value,
                    short: false
                  },
                  {
                    title: 'Rate',
                    value: props.fields.rate.value,
                    short: false
                  },
                  {
                    title: 'Message',
                    value: props.fields.message.value,
                    short: false
                  }
                ]
              }
            ]
          }),
          method: 'POST'
        }
      );
      if (response.status >= 200 && response.status < 300) {
        props.setStatus('success');
      } else {
        props.setStatus('exception');
      }
    },
    onChange: props => changedFields =>
      props.setFields({ ...props.fields, ...changedFields })
  })
);

interface FormDecoratorProps {
  // from props
  visible: boolean;
  onCancel: () => void;
  // from recompose
  onReset: () => void;
  onSubmit: () => void;
  onChange: () => void;
  fields: {
    category: {
      value: string;
    };
    email: {
      value: string;
    };
    rate: {
      value: number;
    };
    message: {
      value: string;
    };
  };
  status: 'active' | 'success' | 'exception';
}

export const FormDecorator = (props: FormDecoratorProps) => (
  <Modal
    title="Online Feedback"
    visible={props.visible}
    onCancel={() => {
      props.onReset();
      props.onCancel();
    }}
    closable={true}
    footer={null}
  >
    {
      <Spin size="large" spinning={props.status === 'active'}>
        {props.status === null && (
          <OnlineFeedbackForm
            {...props.fields}
            onSubmit={props.onSubmit}
            onChange={props.onChange}
          />
        )}
        {(props.status === 'success' || props.status === 'exception') && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Progress type="circle" percent={100} status={props.status} />
            <div>Thank you for your feedback!</div>
          </div>
        )}
      </Spin>
    }
  </Modal>
);

export default enhance(FormDecorator);
