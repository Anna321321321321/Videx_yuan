import * as _ from 'lodash';

interface IView {
  start: number;
  end: number;
  counter: number;
}

export default (pre: IView[], next: IView[]) => {
  const tmp = [];
  [...pre, ...next].forEach(view => {
    for (let i = view.start; i <= view.end; i += 1) {
      if (typeof tmp[i] !== 'undefined') {
        tmp[i] += view.counter;
      } else {
        tmp[i] = view.counter;
      }
    }
  });
  return tmp.reduce((aggregator, counter, index) => {
    if (typeof counter !== 'undefined') {
      if (aggregator.length === 0) {
        aggregator.push({
          counter,
          start: index,
          end: index
        });
      } else {
        const last = aggregator.pop();
        if (counter === last.counter && index - last.end === 1) {
          last.end = index;
          aggregator.push(last);
        } else {
          aggregator.push(last);
          aggregator.push({
            counter,
            start: index,
            end: index
          });
        }
      }
    }
    return aggregator;
  }, []);
};
