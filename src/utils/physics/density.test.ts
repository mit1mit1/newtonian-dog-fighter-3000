import { describe, expect, it } from "vitest";
import { density, densityColorMultiplier } from "./density";

describe("density", () => {
  it("should return 0 if mass is 0", () => {
    expect(density({ mass: 0, radius: 0 })).toBe(0);
    expect(density({ mass: 0, radius: 1 })).toBe(0);
    expect(density({ mass: 0, radius: -1 })).toBe(0);
  });

  it("should return 0 if radius is 0", () => {
    expect(density({ mass: 0, radius: 0 })).toBe(0);
    expect(density({ mass: 1, radius: 0 })).toBe(0);
    expect(density({ mass: -1, radius: 0 })).toBe(0);
  });

  it("should return mass over area", () => {
    expect(density({ mass: Math.PI, radius: 1 })).toBe(1);
  });
});

describe("densityColorMultiplier", () => {
  it("should return a number from 0 to 255", () => {
    const result = densityColorMultiplier({ mass: 1, radius: 2 }, 1);
    expect(result).toBeGreaterThan(-1);
    expect(result).toBeLessThan(256);
  });
});
