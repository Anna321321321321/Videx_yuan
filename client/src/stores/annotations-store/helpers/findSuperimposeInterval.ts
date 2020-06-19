export default (annotations, start, end) =>
  annotations.find(value => {
    return start < value.start && end > value.end;
  });
