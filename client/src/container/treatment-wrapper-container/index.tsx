import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  compose,
  withHandlers,
  withState,
  onlyUpdateForKeys,
  withPropsonChange
} from 'recompose';
import fetch from 'node-fetch';
import _ from 'lodash';
import * as TreatmentStore from '../../stores/treatment-store';

export interface TreatmentProps {
  injectTreatment: (treatments: object) => void;
  experiment: any;
  newComponent: any;
}

const mapStateToProps = (state, props) => ({
  experiment: TreatmentStore.selector.experiment(
    state,
    props.id,
    props.children
  )
});

const enhance = compose(
  connect(
    mapStateToProps,
    {}
  ),
  onlyUpdateForKeys(['experiment']),
  withState('item', 'setItem', null),
  withHandlers({
    injectTreatment: props => treatments => {
      let newTreatedComponent = props.children;
      if (treatments !== undefined && newTreatedComponent !== undefined) {
        treatments.settings.forEach(setting => {
          const newItem = {};
          newItem[setting.name] = setting.value;
          switch (setting.type) {
            case 'css':
              newTreatedComponent = React.cloneElement(newTreatedComponent, {
                style: newItem
              });
              break;

            case 'prop':
              newTreatedComponent = React.cloneElement(newTreatedComponent, {
                ...newItem
              });
              break;

            case 'remove':
              const currentProps = { ...newTreatedComponent.props };
              delete currentProps[setting.name];
              newTreatedComponent = React.createElement(
                newTreatedComponent.type,
                currentProps,
                newTreatedComponent.props.children
              );
              break;
          }
        });
        return newTreatedComponent;
      } else {
        return null;
      }
    }
  }),
  withPropsonChange(['experiment'], props => ({
    ...props,
    newComponent: props.injectTreatment(props.experiment)
  }))
);

export default enhance((props: TreatmentProps) => props.newComponent);
