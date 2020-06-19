import hex2rgb from './hex2rgb';

export default (function() {
  const cache = {};
  return colors => {
    const index = JSON.stringify(colors);
    if (index in cache) {
      return cache[index];
    } else {
      let color;
      switch (colors.length) {
        case 0:
          color = 'white';
          break;
        case 1:
          color = `linear-gradient(${hex2rgb(colors[0])} 100%, white 0%)`;
          break;
        default:
          let style = '';
          colors.forEach(color => {
            style = `${style},${hex2rgb(color)}`;
          });
          // need to remove the first char from the string
          color = `linear-gradient(${style.substring(1, style.length)})`;
          break;
      }
      return (cache[index] = color);
    }
  };
})();
