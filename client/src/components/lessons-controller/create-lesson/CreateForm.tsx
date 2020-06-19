import { Button, DatePicker, Form, Icon, Input, Progress, Upload } from 'antd';
import React, { Component } from 'react';
import { validator } from 'videx/client/core/transcript';

class CreateForm extends Component<any, null> {
  onSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields(async err => {
      if (!err) {
        if (typeof this.props.onSubmit === 'function') {
          this.props.onSubmit();
        }
      }
    });
  };

  disableForm = () => this.props.percent !== null;

  render() {
    return (
      <Form layout="horizontal" onSubmit={this.onSubmit}>
        <Form.Item label="Name">
          {this.props.form.getFieldDecorator('name', {
            rules: [{ required: true, message: 'Name is required!' }]
          })(
            <Input
              placeholder={'Name or title of the lesson'}
              disabled={this.disableForm()}
            />
          )}
        </Form.Item>
        <Form.Item label="Summary">
          {this.props.form.getFieldDecorator('summary', {
            rules: [{ required: true, message: 'Summary is required!' }]
          })(
            <Input
              placeholder={'Brief description of what this lesson is about'}
              disabled={this.disableForm()}
            />
          )}
        </Form.Item>
        <Form.Item label="Category">
          {this.props.form.getFieldDecorator('category', {
            rules: [{ required: true, message: 'Category is required!' }]
          })(<Input placeholder={'default'} disabled={this.disableForm()} />)}
        </Form.Item>
        <Form.Item label="Release Date">
          {this.props.form.getFieldDecorator('releaseDate', {
            rules: [{ required: true, message: 'Release Date is required!' }]
          })(<DatePicker disabled={this.disableForm()} />)}
        </Form.Item>
        <Form.Item label="File">
          {this.props.form.getFieldDecorator('file', {
            valuePropName: 'fileList',
            getValueFromEvent: e => e.fileList.slice(-1),
            rules: [
              {
                type: 'array',
                required: true,
                message: 'Please select a file!'
              }
            ]
          })(
            <Upload.Dragger
              disabled={this.disableForm()}
              beforeUpload={() => false}
              accept="video/mp4,video/mpeg,video/x-ms-wmv,video/x-ms-asf,video/avi,video/webm,video/x-matroska"
            >
              <div
                style={{
                  marginTop: '16px',
                  height: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </div>
            </Upload.Dragger>
          )}
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
          })(<Input.TextArea rows={10} disabled={this.disableForm()} />)}
        </Form.Item>
        {this.props.status === null && (
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                marginTop: '24px'
              }}
            >
              Submit
            </Button>
          </Form.Item>
        )}
        {this.props.percent && (
          <Form.Item>
            <Progress percent={this.props.percent} status={this.props.status} />
          </Form.Item>
        )}
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
      file: Form.createFormField({
        ...props.file,
        value: props.file.value
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
})(CreateForm);
