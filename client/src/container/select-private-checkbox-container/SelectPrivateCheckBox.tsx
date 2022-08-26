import { connect } from 'react-redux';
import { Switch } from 'antd';
import { CloseOutline, CheckOutline } from '@ant-design/icons';
import { compose, withHandlers, onlyUpdateForKeys, withState } from 'recompose';
import * as selectors from '../../stores/annotations-store/selectors';
import * as AnnotationsStore from '../../stores/annotations-store';
import React from 'react';
import MapPropsHOC from 'src/decorators/url-shortener/MapPropsHOC';

interface SelectPrivateCheckBoxProps {
  selectPrivate: boolean;
  publicForShare: boolean;
  update: (id, object) => void;
  id: string;
}
const mapStateToProps = (state) => ({
  selectPrivate: selectors.selectPrivate(state),
});
const mapActionToProps = {
  update: AnnotationsStore.actions.update,
};

const enhance = connect(mapStateToProps, mapActionToProps);
export default enhance((props: SelectPrivateCheckBoxProps) => {
  return (
    <div>
      {props.selectPrivate && (
        <Switch
          onChange={(checked) => {
            if (checked) {
              console.log('Inside onChange in SelectPrivateCheckbox, PRIVATE');
              props.update(props.id, {
                publicForShare: false,
              });
            } else {
              console.log('Inside onChange in SelectPrivateCheckbox, PUBLIC');
              props.update(props.id, {
                publicForShare: true,
              });
            }
          }}
          defaultChecked={!props.publicForShare}
          checkedChildren="private"
          unCheckedChildren="public"
        />
      )}
    </div>
  );
});
