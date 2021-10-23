function hexToRGB(hex, alpha) {
  if (typeof hex !== 'string' || hex[0] !== '#') return null; // or return 'transparent'

  const stringValues =
    hex.length === 4
      ? [hex.slice(1, 2), hex.slice(2, 3), hex.slice(3, 4)].map(n => `${n}${n}`)
      : [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)];
  const intValues = stringValues.map(n => parseInt(n, 16));

  return typeof alpha === 'number'
    ? `rgba(${intValues.join(', ')}, ${alpha})`
    : `rgb(${intValues.join(', ')})`;
}

export default hexToRGB;
