export default (views: number[]) => {
  views.sort((a, b) => a - b);
  return views.reduce((aggregator, view) => {
    if (aggregator.length === 0) {
      aggregator.push({
        start: view,
        end: view,
        counter: 1
      });
    } else {
      const lastView = aggregator.pop();
      if (lastView.start !== view) {
        aggregator.push(lastView);
        aggregator.push({
          start: view,
          end: view,
          counter: 1
        });
      } else {
        lastView.counter += 1;
        aggregator.push(lastView);
      }
    }
    return aggregator;
  }, []);
};
