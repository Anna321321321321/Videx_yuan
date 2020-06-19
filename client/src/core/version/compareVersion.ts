const getIntArray = (version: string): number[] =>
  version.split('.').map(value => parseInt(value, 10));

export default (v1: string, v2: string): boolean => {
  const v1IntArray = getIntArray(v1);
  const v2IntArray = getIntArray(v2);
  if (v1IntArray[0] < v2IntArray[0]) {
    return true;
  } else if (v1IntArray[0] === v2IntArray[0] && v1IntArray[1] < v2IntArray[1]) {
    return true;
  } else if (
    v1IntArray[0] === v2IntArray[0] &&
    v1IntArray[1] === v2IntArray[1] &&
    v1IntArray[2] < v2IntArray[2]
  ) {
    return true;
  } else {
    return false;
  }
};
