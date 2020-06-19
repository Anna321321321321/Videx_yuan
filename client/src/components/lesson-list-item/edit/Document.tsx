import { Button, DatePicker, Form, Input } from 'antd';
import React, { Component } from 'react';
import { validator } from 'videx/client/core/transcript';

const init = {
  loading: false
};

class Document extends Component<any, any> {
  state = init;

  setLoading = loading => {
    this.setState({
      loading: loading
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields(async err => {
      if (!err) {
        if (typeof this.props.onSubmit === 'function') {
          this.setLoading(true);
          this.props.onSubmit();
        }
      }
    });
  };

  render() {
    return (
      <Form layout="horizontal" onSubmit={this.onSubmit}>
        <Form.Item label="Name">
          {this.props.form.getFieldDecorator('name', {
            rules: [{ required: true, message: 'Name is required!' }]
          })(
            <Input
              placeholder={'Name or title of the lesson'}
              disabled={this.state.loading}
            />
          )}
        </Form.Item>
        <Form.Item label="Category">
          {this.props.form.getFieldDecorator('category', {
            rules: [{ required: true, message: 'Category is required!' }]
          })(<Input placeholder={'default'} disabled={this.state.loading} />)}
        </Form.Item>
        <Form.Item label="Summary">
          {this.props.form.getFieldDecorator('summary', {
            rules: [{ required: true, message: 'Summary is required!' }]
          })(<Input placeholder={'default'} disabled={this.state.loading} />)}
        </Form.Item>
        <Form.Item label="Release Date">
          {this.props.form.getFieldDecorator('releaseDate', {
            rules: [{ required: true, message: 'Release Date is required!' }]
          })(<DatePicker />)}
        </Form.Item>
        <Form.Item label="Transcript">
          {this.props.form.getFieldDecorator('transcript', {
            rules: [
              { required: false },
              {
                validator: (rule, value, callback) => {
                  if (!value) {
                    callback();
                  }
                  const pa = new validator();
                  const result = pa.parse(value);
                  if (result.errors.length > 0) {
                    callback(
                      result.errors.reduce((accumulator, error) => {
                        let text = accumulator;
                        text += `Line: ${error.line}`;
                        if (error.col) {
                          text += `, column ${error.col}`;
                        }
                        text += `: ${error.message}`;
                        return text;
                      }, '')
                    );
                  }
                  callback();
                }
              }
            ]
          })(<Input.TextArea rows={10} disabled={this.state.loading} />)}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              marginTop: '24px'
            }}
            loading={this.state.loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create<any>({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        ...props.name,
        value: props.name.value
      }),
      summary: Form.createFormField({
        ...props.summary,
        value: props.summary.value
      }),
      transcript: Form.createFormField({
        ...props.transcript,
        value: props.transcript.value
      }),
      releaseDate: Form.createFormField({
        ...props.releaseDate,
        value: props.releaseDate.value
      }),
      category: Form.createFormField({
        ...props.category,
        value: props.category.value
      })
    };
  }
})(Document);
