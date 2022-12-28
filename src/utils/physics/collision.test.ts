import { describe, expect, it } from "vitest";
import { getCollisionResult } from "./collision";

describe("getCollisionResult", () => {
  it("should return false if the objects aren't overlapping", () => {
    expect(
      getCollisionResult(
        {
          positionX: 0,
          positionY: 0,
          speedX: 0,
          speedY: 0,
          radius: 1,
          mass: 1,
        },
        {
          positionX: 1,
          positionY: 5,
          speedX: 0,
          speedY: 0,
          radius: 1,
          mass: 1,
        }
      )
    ).toBe(false);
    expect(
      getCollisionResult(
        {
          positionX: -4,
          positionY: -3,
          speedX: 0,
          speedY: 0,
          radius: 1,
          mass: 1,
        },
        {
          positionX: 1,
          positionY: 5,
          speedX: 0,
          speedY: 0,
          radius: 2,
          mass: 1,
        }
      )
    ).toBe(false);
  });

  it("should return unaltered copies of objects if they are overlapping but stationary", () => {
    const object1 = {
      positionX: 1,
      positionY: 4.5,
      speedX: 0,
      speedY: 0,
      radius: 1,
      mass: 1,
    };
    const object2 = {
      positionX: 1,
      positionY: 5,
      speedX: 0,
      speedY: 0,
      radius: 1,
      mass: 1,
    };
    const [result1, result2] = getCollisionResult(object1, object2) || [{}, {}];
    expect(result1.positionX).toBe(1);
    expect(result2.positionY).toBe(5);
  });

  it("should return altered copies of objects if they are overlapping and moving stationary", () => {
    const object1 = {
      positionX: 1,
      positionY: 4.5,
      speedX: 0.1,
      speedY: 0.3,
      radius: 2,
      mass: 0.5,
    };
    const object2 = {
      positionX: 1,
      positionY: 5,
      speedX: -0.4,
      speedY: -0.5,
      radius: 2,
      mass: 0.5,
    };
    const [result1, result2] = getCollisionResult(object1, object2) || [{}, {}];
    expect(result1.positionX).toBe(1.3);
    expect(result2.positionY).toBe(5.2);
    expect(result1.speedY).toBe(-0.5);
    expect(result2.speedX).toBe(0.1);
    expect(object1.positionX).toBe(1);
    expect(object2.positionY).toBe(5);
  });

  it("should assume with null masses are unit masses", () => {
    const object1 = {
      positionX: 1,
      positionY: 4.5,
      speedX: 0.1,
      speedY: 0.3,
      radius: 2,
      mass: 0,
    };
    const object2 = {
      positionX: 1,
      positionY: 5,
      speedX: -0.4,
      speedY: -0.5,
      radius: 2,
      mass: 0,
    };
    const [result1, result2] = getCollisionResult(object1, object2) || [{}, {}];
    expect(result1.positionX).toBe(1.3);
    expect(result2.positionY).toBe(5.2);
    expect(result1.speedY).toBe(-0.5);
    expect(result2.speedX).toBe(0.1);
    expect(object1.positionX).toBe(1);
    expect(object2.positionY).toBe(5);
  });
});
