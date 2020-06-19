import { shallow } from 'enzyme';
import React from 'react';
import { OnlineFeedback } from '../OnlineFeedback';

describe('OnlineFeedback Unit Tests', () => {
  it('hidden modal', () => {
    const wrapper = shallow(
      <OnlineFeedback visible={false} changeVisible={null} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('display modal', () => {
    const wrapper = shallow(
      <OnlineFeedback visible={true} changeVisible={null} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
