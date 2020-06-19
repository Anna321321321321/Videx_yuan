import { Button, DatePicker, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import React, { Component } from 'react';

export interface CreateEditCourseFormProps extends FormComponentProps {
  onChange: (value) => void;
  onSubmit: () => void;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 14,
      offset: 6
    }
  }
};

class CreateEditCourseForm extends Component<CreateEditCourseFormProps, any> {
  handleSubmit(e, that) {
    e.preventDefault();
    that.props.form.validateFields((err, _) => {
      if (!err) {
        if (typeof this.props.onSubmit === 'function') {
          this.props.onSubmit();
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal" onSubmit={e => this.handleSubmit(e, this)}>
        <Form.Item label="Course Name" {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Course name is required!' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Release Date" {...formItemLayout}>
          {getFieldDecorator('releaseDate', {
            rules: [
              {
                type: 'object',
                required: true,
                message: 'Please select time!'
              }
            ]
          })(<DatePicker />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              marginTop: '24px'
            }}
          >
            Next
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
      name: Form.createFormField({
        ...props.name,
        value: props.name.value
      }),
      releaseDate: Form.createFormField({
        ...props.releaseDate,
        value: props.releaseDate.value
      })
    };
  }
})(CreateEditCourseForm);
