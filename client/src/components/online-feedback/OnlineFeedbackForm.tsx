import { Button, Form, Input, Rate, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { Component } from 'react';
const Option = Select.Option;

interface OnlineFeedbackFormProps extends FormComponentProps {
  onChange: (value) => void;
  onSubmit: () => void;
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: {
    offset: 1,
    span: 19
  }
};

class OnlineFeedbackForm extends Component<OnlineFeedbackFormProps, null> {
  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields(err => {
      if (!err) {
        if (typeof this.props.onSubmit === 'function') {
          this.props.onSubmit();
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label="Category">
          {getFieldDecorator('category', {
            rules: [{ required: true, message: 'Required Field!' }]
          })(
            <Select placeholder="Please select a category">
              <Option value="bug">Bug Report</Option>
              <Option value="feature">Feature Request</Option>
              <Option value="suggestion">Suggestions</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              { required: false }
            ]
          })(<Input placeholder="If you want us to contact you." />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Rate">
          {getFieldDecorator('rate')(<Rate />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Message">
          {getFieldDecorator('message', {
            rules: [{ required: true, message: 'Required Field!' }]
          })(
            <Input.TextArea
              placeholder="Let us know what you think!"
              rows={5}
            />
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({
  onFieldsChange(props: any, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      category: Form.createFormField({
        ...props.category,
        value: props.category.value
      }),
      email: Form.createFormField({
        ...props.email,
        value: props.email.value
      }),
      rate: Form.createFormField({
        ...props.rate,
        value: props.rate.value
      }),
      message: Form.createFormField({
        ...props.message,
        value: props.message.value
      })
    };
  }
})(OnlineFeedbackForm);
