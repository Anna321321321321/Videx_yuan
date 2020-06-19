import { Tabs } from 'antd';
import React from 'react';
import { selectCategory } from '../../stores/lesson-library-store/actions';

type CategorySelectorProps = {
  children: any;
  selectedCategory: string;
  categories: string[];
  onChange: (value: string) => void;
};

export default (props: CategorySelectorProps) => {
  const defaultKey = props.categories.findIndex(
    element => element === props.selectedCategory
  );
  if (defaultKey === -1) {
    props.onChange('all');
  }
  return (
    <Tabs
      tabPosition="left"
      defaultActiveKey={defaultKey === -1 ? 'all' : props.selectedCategory}
      onChange={props.onChange}
    >
      <Tabs.TabPane key="all" tab="Show All Lessons" forceRender={true}>
        {props.selectedCategory === 'all' ? props.children : null}
      </Tabs.TabPane>
      {props.categories.map(category => {
        if (category !== 'default') {
          return (
            <Tabs.TabPane
              key={category}
              tab={'Show ' + category}
              forceRender={true}
            >
              {category === props.selectedCategory ? props.children : null}
            </Tabs.TabPane>
          );
        }
      })}
    </Tabs>
  );
};
