import { mount } from 'enzyme';
import React from 'react';
import { FormDecorator } from '../FormDecorator';

const props = {
  visible: true,
  onCancel: null,
  onReset: null,
  onSubmit: null,
  onChange: null,
  fields: {
    category: {
      value: 'bug'
    },
    email: {
      value: 'test@ubc.com'
    },
    rate: {
      value: 1
    },
    message: {
      value: 'test'
    }
  },
  status: null
};

describe('FormDecorator Unit Tests', () => {
  it('active', () => {
    const wrapper = mount(<FormDecorator {...props} status="active" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('success', () => {
    const wrapper = mount(<FormDecorator {...props} status="success" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('exception', () => {
    const wrapper = mount(<FormDecorator {...props} status="exception" />);
    expect(wrapper).toMatchSnapshot();
  });
});
