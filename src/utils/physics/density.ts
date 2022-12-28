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
  return (
    Math.floor(
      ((254 * density({ mass, radius })) /
        (density({ mass, radius }) * seed + 0.002)) %
        254
    ) *
      seed +
    1
  );
};
