import { describe, expect, it } from "vitest";
import {
  emptySpaceResistanceMultiplier,
  resistanceAdjustedXSpeed,
  resistanceAdjustedYSpeed,
} from "./resistance";
import { frameSpeedMultiplier } from "@/constants/physics";

describe("resistanceAdjustedXSpeed", () => {
  it("should maintain 0 speed", () => {
    expect(
      resistanceAdjustedXSpeed(
        { radius: 0, positionX: 0, positionY: 0, resistanceMultiplier: 0 },
        { radius: 0, positionX: 0, positionY: 0, speedX: 0, speedY: 0 }
      )
    ).toBe(0);

    expect(
      resistanceAdjustedXSpeed(
        { radius: 2, positionX: 1, positionY: 0, resistanceMultiplier: 0.5 },
        { radius: 2, positionX: 0, positionY: 1, speedX: 0, speedY: 2 }
      )
    ).toBe(0);
  });

  it("should reduce speed by space speed multiplier in space", () => {
    expect(
      resistanceAdjustedXSpeed(
        { radius: 0, positionX: 0, positionY: 0, resistanceMultiplier: 0 },
        { radius: 0, positionX: 0, positionY: 0, speedX: 1, speedY: 0 }
      )
    ).toBe(emptySpaceResistanceMultiplier ** frameSpeedMultiplier);

    expect(
      resistanceAdjustedXSpeed(
        { radius: 1, positionX: 5, positionY: 5, resistanceMultiplier: 0 },
        { radius: 0, positionX: 0, positionY: 0, speedX: -1, speedY: 0 }
      )
    ).toBe(-(emptySpaceResistanceMultiplier ** frameSpeedMultiplier));

    expect(
      // TODO: should potentially be x-component reduced here?
      resistanceAdjustedXSpeed(
        { radius: 1, positionX: 5, positionY: 5, resistanceMultiplier: 0 },
        { radius: 0, positionX: 0, positionY: 0, speedX: -1, speedY: 1 }
      )
    ).toBe(-(emptySpaceResistanceMultiplier ** frameSpeedMultiplier));
  });

  it("should reduce speed by planet speed multiplier in a planet", () => {
    expect(
      resistanceAdjustedXSpeed(
        { radius: 1, positionX: 0, positionY: 0, resistanceMultiplier: 0.5 },
        { radius: 1, positionX: 0, positionY: 0, speedX: 1, speedY: 0 }
      )
    ).toBe(0.5 ** frameSpeedMultiplier);

    expect(
      resistanceAdjustedXSpeed(
        { radius: 1, positionX: 1, positionY: 1, resistanceMultiplier: 0 },
        { radius: 2, positionX: 0, positionY: 0, speedX: -1, speedY: 0 }
      )
    ).toBe(-0);

    expect(
      // TODO: should potentially be x-component reduced here?
      resistanceAdjustedXSpeed(
        { radius: 1, positionX: 5, positionY: 5, resistanceMultiplier: -2 },
        { radius: 1, positionX: 5, positionY: 5, speedX: -1, speedY: 1 }
      )
    ).toBe(-1 * (-2) ** frameSpeedMultiplier);
  });
});

describe("resistanceAdjustedYSpeed", () => {
  it("should maintain 0 speed", () => {
    expect(
      resistanceAdjustedYSpeed(
        { radius: 0, positionX: 0, positionY: 0, resistanceMultiplier: 0 },
        { radius: 0, positionX: 0, positionY: 0, speedX: 0, speedY: 0 }
      )
    ).toBe(0);

    expect(
      resistanceAdjustedYSpeed(
        { radius: 2, positionX: 1, positionY: 0, resistanceMultiplier: 0.5 },
        { radius: 2, positionX: 0, positionY: 1, speedX: 2, speedY: 0 }
      )
    ).toBe(0);
  });

  it("should reduce speed by space speed multiplier in space", () => {
    expect(
      resistanceAdjustedYSpeed(
        { radius: 0, positionX: 0, positionY: 0, resistanceMultiplier: 0 },
        { radius: 0, positionX: 0, positionY: 0, speedX: 0, speedY: 1 }
      )
    ).toBe(emptySpaceResistanceMultiplier ** frameSpeedMultiplier);

    expect(
      resistanceAdjustedYSpeed(
        { radius: 1, positionX: 5, positionY: 5, resistanceMultiplier: 0 },
        { radius: 0, positionX: 0, positionY: 0, speedX: 0, speedY: -1 }
      )
    ).toBe(-(emptySpaceResistanceMultiplier ** frameSpeedMultiplier));

    expect(
      // TODO: should potentially be y-component reduced here?
      resistanceAdjustedYSpeed(
        { radius: 1, positionX: 5, positionY: 5, resistanceMultiplier: 0 },
        { radius: 0, positionX: 0, positionY: 0, speedX: 1, speedY: -1 }
      )
    ).toBe(-(emptySpaceResistanceMultiplier ** frameSpeedMultiplier));
  });

  it("should reduce speed by planet speed multiplier in a planet", () => {
    expect(
      resistanceAdjustedYSpeed(
        { radius: 1, positionX: 0, positionY: 0, resistanceMultiplier: 0.5 },
        { radius: 1, positionX: 0, positionY: 0, speedX: 0, speedY: 1 }
      )
    ).toBe(0.5 ** frameSpeedMultiplier);

    expect(
      resistanceAdjustedYSpeed(
        { radius: 1, positionX: 1, positionY: 1, resistanceMultiplier: 0 },
        { radius: 2, positionX: 0, positionY: 0, speedX: 0, speedY: -1 }
      )
    ).toBe(-0);

    expect(
      // TODO: should potentially be y-component reduced here?
      resistanceAdjustedYSpeed(
        { radius: 1, positionX: 5, positionY: 5, resistanceMultiplier: -2 },
        { radius: 1, positionX: 5, positionY: 5, speedX: 1, speedY: -1 }
      )
    ).toBe(-1 * (-2) ** frameSpeedMultiplier);
  });
});
