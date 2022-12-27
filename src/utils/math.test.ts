import { describe, expect, it } from "vitest";
import {
  directionMultiplier,
  distanceSquared,
  isOverlapping,
  xComponent,
  yComponent,
} from "./math";

describe("distanceSquared", () => {
  it("should return 0 distance from point to same point", () => {
    expect(distanceSquared(2, 2, 1, 1)).toBe(0);
    expect(distanceSquared(0, 0, 0, 0)).toBe(0);
    expect(distanceSquared(-4, -4, -2, -2)).toBe(0);
  });

  it("should return positive distance squared for positive displacement", () => {
    expect(distanceSquared(2, 5, 1, 5)).toBe(25);
    expect(distanceSquared(-1, 3, -4, -1)).toBe(25);
  });

  it("should return positive distance squared for negative displacement", () => {
    expect(distanceSquared(5, 2, 5, 1)).toBe(25);
    expect(distanceSquared(3, -1, -4, -1)).toBe(25);
  });
});

describe("directionMultiplier", () => {
  it("should return 0 if the points are identical", () => {
    expect(directionMultiplier(2, 2)).toBe(0);
    expect(directionMultiplier(0, 0)).toBe(0);
    expect(directionMultiplier(-4, -4)).toBe(0);
  });

  it("should return positive 1 if x2 > x1", () => {
    expect(directionMultiplier(2, 5)).toBe(1);
    expect(directionMultiplier(-1, 3)).toBe(1);
    expect(directionMultiplier(-1, 0)).toBe(1);
    expect(directionMultiplier(-4, -1)).toBe(1);
  });

  it("should return negative 1 if x2 < x1", () => {
    expect(directionMultiplier(5, 2)).toBe(-1);
    expect(directionMultiplier(3, -1)).toBe(-1);
    expect(directionMultiplier(0, -1)).toBe(-1);
    expect(directionMultiplier(-1, -4)).toBe(-1);
  });
});

describe("xComponent", () => {
  it("should return 0 if vector is null", () => {
    expect(xComponent(0, 0, 0, 0)).toBe(0);
    expect(xComponent(2, 2, -4, -4)).toBe(0);
    expect(xComponent(-4, -4, 3, 3)).toBe(0);
  });

  it("should return 0 if vector is purely vertical", () => {
    expect(xComponent(2, 2, 4, 5)).toBe(0);
    expect(xComponent(0, 0, -2, -8)).toBe(0);
    expect(xComponent(-4, -4, 4, -6)).toBe(0);
  });

  it("should return 1 if vector is purely horizontal", () => {
    expect(xComponent(2, 5, 0, 0)).toBe(1);
    expect(xComponent(-1, 3, -2, -2)).toBe(1);
    expect(xComponent(5, 0, 1, 1)).toBe(1);
    expect(xComponent(3, -2, -1, -1)).toBe(1);
  });

  it("should return unsigned x component for angled vector", () => {
    expect(xComponent(0, 3, 0, 4)).toBe(9 / 25);
    expect(xComponent(0, 3, 4, 0)).toBe(9 / 25);
    expect(xComponent(0, -4, 3, 0)).toBe(16 / 25);
  });
});

describe("yComponent", () => {
  it("should return 0 if vector is null", () => {
    expect(yComponent(0, 0, 0, 0)).toBe(0);
    expect(yComponent(2, 2, -4, -4)).toBe(0);
    expect(yComponent(-4, -4, 3, 3)).toBe(0);
  });

  it("should return 0 if vector is purely horizontal", () => {
    expect(yComponent(2, 5, 0, 0)).toBe(0);
    expect(yComponent(-1, 3, -2, -2)).toBe(0);
    expect(yComponent(5, 0, 1, 1)).toBe(0);
    expect(yComponent(3, -2, -1, -1)).toBe(0);
  });

  it("should return 1 if vector is purely vertical", () => {
    expect(yComponent(2, 2, 4, 5)).toBe(1);
    expect(yComponent(0, 0, -2, -8)).toBe(1);
    expect(yComponent(-4, -4, 4, -6)).toBe(1);
  });

  it("should return unsigned y component for angled vector", () => {
    expect(yComponent(0, 3, 0, 4)).toBe(16 / 25);
    expect(yComponent(0, 3, 4, 0)).toBe(16 / 25);
    expect(yComponent(0, -4, 3, 0)).toBe(9 / 25);
  });
});

describe("isOverlapping", () => {
  it("should return false if circles are points", () => {
    expect(
      isOverlapping(
        { positionX: 0, positionY: 0, radius: 0 },
        { positionX: 0, positionY: 0, radius: 0 }
      )
    ).toBe(false);
    expect(
      isOverlapping(
        { positionX: 1, positionY: -1, radius: 0 },
        { positionX: 1, positionY: -1, radius: 0 }
      )
    ).toBe(false);
    expect(
      isOverlapping(
        { positionX: 1, positionY: -1, radius: 0 },
        { positionX: 3, positionY: 5, radius: 0 }
      )
    ).toBe(false);
  });

  it("should return false if circles touch but don't overlap", () => {
    expect(
      isOverlapping(
        { positionX: 0, positionY: 0, radius: 1 },
        { positionX: 2, positionY: 0, radius: 1 }
      )
    ).toBe(false);
    expect(
      isOverlapping(
        { positionX: 0, positionY: 0, radius: 1 },
        { positionX: 0, positionY: 2, radius: 1 }
      )
    ).toBe(false);
  });

  it("should return false if circles neither touch nor overlap", () => {
    expect(
      isOverlapping(
        { positionX: 0, positionY: 0, radius: 1 },
        { positionX: 3, positionY: 0, radius: 1 }
      )
    ).toBe(false);
    expect(
      isOverlapping(
        { positionX: 0, positionY: 0, radius: 1 },
        { positionX: 0, positionY: 2, radius: 0.5 }
      )
    ).toBe(false);
  });

  it("should return true if circles overlap", () => {
    expect(
      isOverlapping(
        { positionX: 0, positionY: 0, radius: 2 },
        { positionX: 3, positionY: 0, radius: 1.5 }
      )
    ).toBe(true);
    expect(
      isOverlapping(
        { positionX: 0, positionY: 0, radius: 1 },
        { positionX: 0, positionY: -0.1, radius: 0.5 }
      )
    ).toBe(true);
  });
});
