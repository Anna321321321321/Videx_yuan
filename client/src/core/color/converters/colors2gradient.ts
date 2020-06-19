import hex2rgb from './hex2rgb';

export default (function() {
  return colors => {
    let color;
    // apply latest highlight color in case of array of highlights
    switch (colors.length) {
      case 0:
        color = 'white';
        break;
      default:
        color = `${hex2rgb(colors[colors.length - 1])}`;
        break;
    }
    return color;
  };
})();
