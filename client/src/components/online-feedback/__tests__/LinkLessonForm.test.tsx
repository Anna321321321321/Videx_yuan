import { shallow } from 'enzyme';
import React from 'react';
import OnlineFeedbackForm from '../OnlineFeedbackForm';

const props = {
  fields: {
    category: {
      value: 'request'
    },
    email: {
      value: 'test@ubc.com'
    },
    rate: {
      value: 1
    },
    message: {
      value: 'test'
    },
    onSubmit: null,
    onChange: null
  }
};

describe('OnlineFeedbackForm Unit Tests', () => {
  it('simple test', () => {
    const wrapper = shallow(<OnlineFeedbackForm {...props.fields} />);
    expect(wrapper).toMatchSnapshot();
  });
});
