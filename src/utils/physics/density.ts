export const density = ({
  mass,
  radius,
}: {
  radius?: number;
  mass?: number;
}) => {
  return radius ? (mass ?? 0) / (Math.PI * radius ** 2) : 0;
};

export const densityColorMultiplier = (
  {
    mass,
    radius,
  }: {
    radius?: number;
    mass?: number;
  },
  seed: number
) => {
  return Math.floor((density({ mass, radius })* 1000 * seed) % 254);
};
