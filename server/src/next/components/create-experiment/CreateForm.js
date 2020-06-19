import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

class CreateForm extends Component {
  onSubmit = event => {
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
    return (
      <Form layout="horizontal" onSubmit={this.onSubmit}>
        <Form.Item label="Name">
          {this.props.form.getFieldDecorator('name', {
            rules: [{ required: true, message: 'Name is required!' }]
          })(<Input placeholder={'Name of this experiment'} />)}
        </Form.Item>
        <Form.Item label="Treatments">
          {this.props.form.getFieldDecorator('treatments', {
            rules: [
              { required: true },
              {
                validator: (rule, value, callback) => {
                  try {
                    let total = 0;
                    // first parse the string
                    const treatments = JSON.parse(value);
                    // treatments must be an array
                    if (!Array.isArray(treatments)) {
                      return callback('Error! Treatments should be an array!');
                    }
                    // iterate through treatment
                    for (let treatment of treatments) {
                      // setting must be an array
                      if (!Array.isArray(treatment.settings)) {
                        return callback('Error! Settings should be an array!');
                      }
                      for (let setting of treatment.settings) {
                        if (
                          !Object.keys(setting).every(e =>
                            ['value', 'name'].includes(e)
                          )
                        ) {
                          return callback('Error! Setting structure is wrong!');
                        }
                        if (typeof setting.name !== 'string') {
                          return callback(
                            'Error! Setting name should be string!'
                          );
                        }
                        const type = typeof setting.value;
                        console.log(type);
                        switch (typeof setting.value) {
                          case 'boolean':
                            break;
                          case 'number':
                            break;
                          case 'string':
                            break;
                          case 'object':
                            if (Object.keys(setting.value).length === 0) {
                              return callback('Object cannot be empty');
                            }
                            break;
                          default:
                            return callback(
                              'Error! Setting value should be boolean, number, string, object!'
                            );
                        }
                      }
                      if (typeof treatment.percentage !== 'number') {
                        return callback(
                          'Error! treatment percentage should be number!'
                        );
                      }
                      total += treatment.percentage;
                    }
                    if (total !== 1.0) {
                      return callback('Error! Total percentage should be 1!');
                    }
                    return callback();
                  } catch (e) {
                    return callback(e);
                  }
                }
              }
            ]
          })(<Input.TextArea rows={10} />)}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              marginTop: '24px'
            }}
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        ...props.name,
        value: props.name.value
      }),
      treatments: Form.createFormField({
        ...props.treatments,
        value: props.treatments.value
      })
    };
  }
})(CreateForm);
