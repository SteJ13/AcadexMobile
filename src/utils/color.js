// utils/color.js
export const shade = (hex, pct) => {
  const h = hex.replace('#', '');
  const num = parseInt(h, 16);
  const clamp = (v) => Math.max(0, Math.min(255, v));
  const amt = Math.round(2.55 * pct);

  const r = clamp((num >> 16) + amt);
  const g = clamp(((num >> 8) & 0x00ff) + amt);
  const b = clamp((num & 0x0000ff) + amt);

  return `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

export const gradientFromBase = (base) => {
  return [shade(base, 12), shade(base, -8)];
};
