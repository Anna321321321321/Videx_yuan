export default num => {
  return num.toString().length === 1 ? '0' + num : num;
};
