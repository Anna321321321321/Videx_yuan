import { message } from 'antd';
import React from 'react';
import { compose, mapProps, withHandlers, withState } from 'recompose';
import { Button, TextArea } from 'semantic-ui-react';
import * as constants from './constants';

interface EnhancerHOCOutterProps {
  loading: boolean;
  onCreateNote: (note: string) => void;
}

interface EnhancerHOCInnerProps {
  loading: boolean;
  note: string;
  submitNote: () => void;
  onChange: (event) => void;
  onKeyDown: (event) => void;
}

interface withStateNote {
  note: string;
  setNote: (value: string) => void;
}

interface withHandlersSubmitNote {
  submitNote: () => void;
}

interface withHandlers {
  onChange: (event) => void;
  onKeyDown: (event) => void;
}

const enhance = compose<EnhancerHOCInnerProps, EnhancerHOCOutterProps>(
  withState<EnhancerHOCOutterProps, string, 'note', 'setNote'>(
    'note',
    'setNote',
    ''
  ),
  withHandlers<EnhancerHOCOutterProps & withStateNote, withHandlersSubmitNote>({
    submitNote: props => () => {
      if (props.note !== '') {
        props.onCreateNote(props.note);
        props.setNote('');
      } else {
        message.error('Note cannot be empty!');
      }
    }
  }),
  withHandlers<
    EnhancerHOCOutterProps & withStateNote & withHandlersSubmitNote,
    withHandlers
  >({
    onChange: props => event => props.setNote(event.target.value),
    onKeyDown: props => event => {
      if (event.which === 13) {
        if (!event.shiftKey) {
          event.preventDefault();
          props.submitNote();
        }
      }
    }
  }),
  mapProps<
    EnhancerHOCInnerProps,
    EnhancerHOCOutterProps &
      withStateNote &
      withHandlersSubmitNote &
      withHandlers
  >(props => ({
    note: props.note,
    loading: props.loading,
    submitNote: props.submitNote,
    onKeyDown: props.onKeyDown,
    onChange: props.onChange
  }))
);

export default enhance((props: EnhancerHOCInnerProps) => (
  <div style={{ display: 'flex', padding: '5px', margin: '8px' }}>
    <div style={{ flexBasis: '92%' }}>
      <TextArea
        style={{ width: '100%', padding: '7px', border: 'none' }}
        autoHeight={true}
        rows={1}
        placeholder={constants.NOTE_INPUT_PLACE_HOLDER}
        value={props.note}
        disabled={props.loading}
        onChange={props.onChange}
        autoFocus={true}
        onKeyDown={props.onKeyDown}
      />
    </div>
    <div style={{ flexBasis: '8%', marginLeft: '10px' }}>
      <Button color="blue" disabled={props.loading} onClick={props.submitNote}>
        Add
      </Button>
    </div>
  </div>
));
