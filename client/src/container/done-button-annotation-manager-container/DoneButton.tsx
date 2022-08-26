import { connect } from 'react-redux';
import { Button } from 'antd';
import { compose, withHandlers, onlyUpdateForKeys, withState } from 'recompose';
import * as selectors from '../../stores/annotations-store/selectors';
import * as AnnotationsStore from '../../stores/annotations-store';

import React from 'react';

interface DoneButtonProps {
  selectPrivate: boolean;
  disableSelectPrivate: () => void;
}
const mapStateToProps = (state) => ({
  selectPrivate: selectors.selectPrivate(state),
});
const mapDispatchToProps = {
  disableSelectPrivate: AnnotationsStore.actions.disableSelectPrivate,
};

const enhance = connect(mapStateToProps, mapDispatchToProps);
export default enhance((props: DoneButtonProps) => {
  return (
    <div>
      {props.selectPrivate && (
        <Button
          type="primary"
          className="select-done-button"
          onClick={props.disableSelectPrivate}
        >
          Done
        </Button>
      )}
    </div>
  );
});
