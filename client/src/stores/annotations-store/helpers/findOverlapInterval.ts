export default (annotations, start, end) =>
  annotations.find(value => {
    const annotationStart = value.start;
    const annotationEnd = value.end;
    return (
      (start > annotationStart && start < annotationEnd) ||
      (end > annotationStart && end < annotationEnd)
    );
  });
