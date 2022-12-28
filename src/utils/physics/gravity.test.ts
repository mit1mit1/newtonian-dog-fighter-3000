import { describe, expect, it } from "vitest";
import { gravityAccelerationX, gravityAccelerationY } from "./gravity";

describe("gravityAccelerationX", () => {
  it("should return 0 acceleration from point to same point", () => {
    expect(
      gravityAccelerationX(
        {
          radius: 3,
          mass: 7,
          positionX: 0,
          positionY: 0,
        },
        { positionX: 0, positionY: 0 }
      )
    ).toBe(0);
    expect(
      gravityAccelerationX(
        {
          radius: -1,
          mass: 25,
          positionX: -1,
          positionY: 1,
        },
        { positionX: -1, positionY: 1 }
      )
    ).toBe(0);

    expect(
      gravityAccelerationX(
        {
          radius: 0,
          mass: 0,
          positionX: 1,
          positionY: 0,
        },
        { positionX: 1, positionY: 0 }
      )
    ).toBe(0);
  });

  it("should return 0 acceleration for massless planet", () => {
    expect(
      gravityAccelerationX(
        {
          radius: 3,
          mass: 0,
          positionX: 0,
          positionY: 0,
        },
        { positionX: 1, positionY: 1 }
      )
    ).toEqual(0);
    expect(
      gravityAccelerationX(
        {
          radius: 4,
          mass: 0,
          positionX: -1,
          positionY: 1,
        },
        { positionX: 5, positionY: 5 }
      )
    ).toEqual(-0);

    expect(
      gravityAccelerationX(
        {
          radius: 0,
          mass: 0,
          positionX: 1,
          positionY: 0,
        },
        { positionX: 1, positionY: 0 }
      )
    ).toEqual(0);
  });

  it("should return 0 acceleration when vanishingly near center of planet", () => {
    expect(
      gravityAccelerationX(
        {
          radius: 3,
          mass: 0,
          positionX: 0,
          positionY: 0,
        },
        { positionX: 0.001, positionY: -0.001 }
      )
    ).toBe(0);
    expect(
      gravityAccelerationX(
        {
          radius: 3,
          mass: 25,
          positionX: 0,
          positionY: 0,
        },
        { positionX: -0.001, positionY: -0.001 }
      )
    ).toBe(0);
    expect(
      gravityAccelerationX(
        {
          radius: 3,
          mass: 129,
          positionX: 0.00001,
          positionY: -0.00001,
        },
        { positionX: 0.001, positionY: -0.001 }
      )
    ).toBe(0);
  });

  it("should return signed Newtonian acceleration when outside a massive planet", () => {
    expect(
      gravityAccelerationX(
        {
          radius: 3,
          mass: 5,
          positionX: 0,
          positionY: 0,
        },
        { positionX: 4, positionY: 0 }
      )
    ).toBe(-0.3125);
    expect(
      gravityAccelerationX(
        {
          radius: 3,
          mass: 5,
          positionX: 0,
          positionY: 0,
        },
        { positionX: -4, positionY: 0 }
      )
    ).toBe(0.3125);
    expect(
      gravityAccelerationX(
        {
          radius: 3,
          mass: 5,
          positionX: 0,
          positionY: 0,
        },
        { positionX: 0, positionY: 4 }
      )
    ).toBe(0);
    expect(
      gravityAccelerationX(
        {
          radius: 3,
          mass: 5,
          positionX: 0,
          positionY: 0,
        },
        { positionX: 4, positionY: 3 }
      )
    ).toBe(-0.128);
  });

  it("should return reduced Newtonianesque acceleration in outer part of large massive planet", () => {
    expect(
      gravityAccelerationX(
        {
          radius: 5,
          mass: 5,
          positionX: 0,
          positionY: 0,
        },
        { positionX: 4, positionY: 0 }
      )
    ).toBe(-0.078125);
    expect(
      gravityAccelerationX(
        {
          radius: 5,
          mass: 5,
          positionX: 0,
          positionY: 0,
        },
        { positionX: -4, positionY: 0 }
      )
    ).toBe(0.078125);
    expect(
      gravityAccelerationX(
        {
          radius: 5,
          mass: 5,
          positionX: 0,
          positionY: 0,
        },
        { positionX: 0, positionY: 4 }
      )
    ).toBe(0);
    expect(
      gravityAccelerationX(
        {
          radius: 7,
          mass: 5,
          positionX: 0,
          positionY: 0,
        },
        { positionX: 4, positionY: 3 }
      )
    ).toBe(-0.0256);
  });
});

describe("gravityAccelerationY", () => {
  it("should return 0 acceleration from point to same point", () => {
    expect(
      gravityAccelerationY(
        {
          radius: 3,
          mass: 7,
          positionX: 0,
          positionY: 0,
        },
        { positionX: 0, positionY: 0 }
      )
    ).toBe(0);
    expect(
      gravityAccelerationY(
        {
          radius: -1,
          mass: 25,
          positionX: -1,
          positionY: 1,
        },
        { positionX: -1, positionY: 1 }
      )
    ).toBe(0);

    expect(
      gravityAccelerationY(
        {
          radius: 0,
          mass: 0,
          positionX: 1,
          positionY: 0,
        },
        { positionX: 1, positionY: 0 }
      )
    ).toBe(0);
  });

  it("should return 0 acceleration for massless planet", () => {
    expect(
      gravityAccelerationY(
        {
          radius: 3,
          mass: 0,
          positionX: 0,
          positionY: 0,
        },
        { positionX: 1, positionY: 1 }
      )
    ).toEqual(0);
    expect(
      gravityAccelerationY(
        {
          radius: 4,
          mass: 0,
          positionX: -1,
          positionY: 1,
        },
        { positionX: 5, positionY: 5 }
      )
    ).toEqual(-0);

    expect(
      gravityAccelerationY(
        {
          radius: 0,
          mass: 0,
          positionX: 1,
          positionY: 0,
        },
        { positionX: 1, positionY: 0 }
      )
    ).toEqual(0);
  });

  it("should return 0 acceleration when vanishingly near center of planet", () => {
    expect(
      gravityAccelerationY(
        {
          radius: 3,
          mass: 0,
          positionX: 0,
          positionY: 0,
        },
        { positionX: 0.001, positionY: -0.001 }
      )
    ).toBe(0);
    expect(
      gravityAccelerationY(
        {
          radius: 3,
          mass: 25,
          positionX: 0,
          positionY: 0,
        },
        { positionX: -0.001, positionY: -0.001 }
      )
    ).toBe(0);
    expect(
      gravityAccelerationY(
        {
          radius: 3,
          mass: 129,
          positionX: 0.00001,
          positionY: -0.00001,
        },
        { positionX: 0.001, positionY: -0.001 }
      )
    ).toBe(0);
  });

  it("should return signed Newtonian acceleration when outside a massive planet", () => {
    expect(
      gravityAccelerationY(
        {
          radius: 3,
          mass: 5,
          positionX: 0,
          positionY: 0,
        },
        { positionX: 0, positionY: 4 }
      )
    ).toBe(-0.3125);
    expect(
      gravityAccelerationY(
        {
          radius: 3,
          mass: 5,
          positionX: 0,
          positionY: 0,
        },
        { positionX: 0, positionY: -4 }
      )
    ).toBe(0.3125);
    expect(
      gravityAccelerationY(
        {
          radius: 3,
          mass: 5,
          positionX: 0,
          positionY: 0,
        },
        { positionX: 4, positionY: 0 }
      )
    ).toBe(0);
    expect(
      gravityAccelerationY(
        {
          radius: 3,
          mass: 5,
          positionX: 0,
          positionY: 0,
        },
        { positionX: 3, positionY: 4 }
      )
    ).toBe(-0.128);
  });

  it("should return reduced Newtonianesque acceleration in outer part of large massive planet", () => {
    expect(
      gravityAccelerationY(
        {
          radius: 5,
          mass: 5,
          positionX: 0,
          positionY: 0,
        },
        { positionX: 0, positionY: 4 }
      )
    ).toBe(-0.078125);
    expect(
      gravityAccelerationY(
        {
          radius: 5,
          mass: 5,
          positionX: 0,
          positionY: 0,
        },
        { positionX: 0, positionY: -4 }
      )
    ).toBe(0.078125);
    expect(
      gravityAccelerationY(
        {
          radius: 5,
          mass: 5,
          positionX: 0,
          positionY: 0,
        },
        { positionX: 4, positionY: 0 }
      )
    ).toBe(0);
    expect(
      gravityAccelerationY(
        {
          radius: 7,
          mass: 5,
          positionX: 0,
          positionY: 0,
        },
        { positionX: 3, positionY: 4 }
      )
    ).toBe(-0.0256);
  });
});
