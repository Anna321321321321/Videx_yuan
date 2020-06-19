export const timestamp2pixels = (
  timestamp: number,
  segment: { start: number; end: number },
  width
): number =>
  ((timestamp - segment.start) / (segment.end - segment.start)) * width;

export const pixels2timestamp = (
  pixel: number,
  segment: { start: number; end: number },
  width
): number => (pixel / width) * (segment.end - segment.start) + segment.start;

export const time2thumbnail = (timestamp: number, url, sas) => {
  const pad = (n, width) => {
    n = n + '';
    // prettier-ignore
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  };
  // prettier-ignore
  return url + pad(Math.max(1, Math.floor(timestamp / 5)), 6) + '.jpg' + '?' + sas;
};
