import { shallow } from 'enzyme';
import moment from 'moment';
import React from 'react';
import CreateCourseForm from '..';

describe('Create Edit Course Form Component Unit Tests', () => {
  it('Render component', () => {
    const wrapper = shallow(
      //@ts-ignore
      <CreateCourseForm
        name={{
          value: 'name'
        }}
        category={{
          value: 'default'
        }}
        releaseDate={{
          value: moment('1970-01-01 16:00Z')
        }}
        onChange={Function}
        onSubmit={Function}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
