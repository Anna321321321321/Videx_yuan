import { Map } from 'immutable';

export const string2lut = (transcript: {
  text: string;
  start: number;
  end: number;
}) => {
  const { text, start, end } = transcript;
  const textArray = text.split(' ');
  const length = textArray.length;
  const interval: number = (end - start) / length;
  return textArray.map((text, i) => ({
    text,
    range: {
      start: Number((start + interval * i).toFixed(3)),
      end: Number((start + interval * (i + 1)).toFixed(3))
    },
    color: '#7c7b7b',
    fontWeight: 'normal',
    background: null
  }));
};

export const filter4word = (
  range: Map<any, any>,
  condition: { start: number; end: number }
) => {
  const mid =
    (range.getIn(['range', 'start']) + range.getIn(['range', 'end'])) / 2;
  return mid > condition.start && mid < condition.end;
};

export const filter4segment = (
  range: Map<any, any>,
  condition: { start: number; end: number }
) => {
  return !(
    range.getIn(['range', 'start']) > condition.end ||
    range.getIn(['range', 'end']) < condition.start
  );
};

export const filter4initialsegment = (
  range: Map<any, any>,
  condition1: number,
  condition2: number
) => {
  if (
    !(
      range.getIn(['range', 'start']) > condition2 ||
      range.getIn(['range', 'end']) < condition1
    )
  ) {
    return (
      (range.getIn(['range', 'start']) === condition1 ||
        range.getIn(['range', 'start']) < condition1) &&
      range.getIn(['range', 'end']) !== condition1
    );
  }
};

export const filter4point = (range: Map<any, any>, time: number) => {
  return !(
    range.getIn(['range', 'end']) < time ||
    range.getIn(['range', 'start']) > time
  );
};
