export default (annotation, id) =>
  annotation.findIndex(value => value.get('id') === id);
