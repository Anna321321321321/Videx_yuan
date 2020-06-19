import { message } from 'antd';
import moment from 'moment';
import React from 'react';
import { compose, mapProps, withHandlers, withState } from 'recompose';
import { Button, Grid, TextArea } from 'semantic-ui-react';
import * as constants from './constants';

interface EnhancerHOCOutterProps {
  id: string;
  note: string;
  time: number;
  loading: boolean;
  onSeek: (time: number) => void;
  onUpdateNote: (id: string, note: string, time: number) => void;
  onDeleteNote: (id: string) => void;
}

interface EnhancerHOCInnerProps {
  edit: boolean;
  note: string;
  time: number;
  loading: boolean;
  updateNote: () => void;
  onKeyDown: (event) => void;
  onChange: (event) => void;
  onSeek: () => void;
  onDeleteNote: () => void;
}

interface withStateEdit {
  edit: boolean;
  setEdit: (value: boolean) => void;
}

interface withStateNote {
  note: string;
  setNote: (value: string) => void;
}

interface withHandlersUpdateNote {
  updateNote: () => void;
}

interface withHandlers {
  onKeyDown: (event) => void;
  onChange: (event) => void;
  onSeek: () => void;
  onDeleteNote: () => void;
}

const enhancerHOC = compose<EnhancerHOCInnerProps, EnhancerHOCOutterProps>(
  withState<EnhancerHOCOutterProps, boolean, 'edit', 'setEdit'>(
    'edit',
    'setEdit',
    false
  ),
  withState<EnhancerHOCOutterProps & withStateEdit, string, 'note', 'setNote'>(
    'note',
    'setNote',
    props => props.note
  ),
  withHandlers<
    EnhancerHOCOutterProps & withStateEdit & withStateNote,
    withHandlersUpdateNote
  >({
    updateNote: props => () => {
      if (props.note) {
        props.onUpdateNote(props.id, props.note, props.time);
      } else {
        message.error('Note cannot be empty!');
      }
    }
  }),
  withHandlers<
    EnhancerHOCOutterProps &
      withStateEdit &
      withStateNote &
      withHandlersUpdateNote,
    withHandlers
  >({
    onKeyDown: props => event => {
      if (event.which === 13) {
        if (!event.shiftKey) {
          event.preventDefault();
          props.setEdit(false);
          props.updateNote();
        }
      }
    },
    onChange: props => event => {
      props.setNote(event.target.value);
      props.setEdit(true);
    },
    onSeek: props => () => props.onSeek(props.time),
    onDeleteNote: props => () => props.onDeleteNote(props.id)
  }),
  mapProps<
    EnhancerHOCInnerProps,
    EnhancerHOCOutterProps &
      withStateEdit &
      withStateNote &
      withHandlersUpdateNote &
      withHandlers
  >(props => ({
    edit: props.edit,
    note: props.note,
    time: props.time,
    loading: props.loading,
    updateNote: props.updateNote,
    onKeyDown: props.onKeyDown,
    onChange: props.onChange,
    onSeek: props.onSeek,
    onDeleteNote: props.onDeleteNote
  }))
);

export default enhancerHOC((props: EnhancerHOCInnerProps) => (
  <Grid
    columns="equal"
    container={true}
    style={{ width: '100%', paddingLeft: '20px' }}
  >
    <Grid.Column width={2}>
      <Button
        compact={true}
        content={moment(props.time * 1000).format('mm:ss')}
        onClick={props.onSeek}
        size="small"
        style={{ zIndex: '1' }}
      />
    </Grid.Column>
    <Grid.Column width={12}>
      <TextArea
        as="textarea"
        autoHeight={true}
        rows={1}
        value={props.note}
        style={{ padding: '5px', width: '100%', border: 'none' }}
        onKeyDown={props.onKeyDown}
        onChange={props.onChange}
        disabled={props.loading}
        placeholder={constants.NOTE_INPUT_PLACE_HOLDER}
      />
    </Grid.Column>
    <Grid.Column width={1}>
      <Button
        icon={props.edit ? 'checkmark' : 'delete'}
        color={props.edit ? 'yellow' : null}
        disabled={props.loading}
        onClick={props.edit ? props.updateNote : props.onDeleteNote}
        compact={true}
      />
    </Grid.Column>
  </Grid>
));
