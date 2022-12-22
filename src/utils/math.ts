const foundPrimes = [2, 3, 5, 7, 11, 13, 17, 19];

const getNextPrime = (foundPrimes: Array<number>) => {
  let checking = foundPrimes[foundPrimes.length - 1] + 2;
  while (foundPrimes.find((p) => checking % p === 0)) {
    checking = checking + 2;
  }
  return checking;
};

export const getNthPrime = (n: number) => {
  while (n >= foundPrimes.length) {
    foundPrimes.push(getNextPrime(foundPrimes));
  }
  return foundPrimes[n];
};


export const distanceSquared = (x1: number, x2: number, y1: number, y2: number) => {
  return (x2 - x1) ** 2 + (y2 - y1) ** 2
}

export const directionMultiplier = (x1: number, x2: number) => {
  return (x2 - x1) / Math.abs(x1 - x2)
}

export const xComponent = (x1: number, x2: number, y1: number, y2: number) => {
  return (x2 - x1) ** 2 / ((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

export const yComponent = (x1: number, x2: number, y1: number, y2: number) => {
  return (y2 - y1) ** 2 / ((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

export const isOverlapping = (circle1: { positionX: number, positionY: number, radius: number }, circle2: { positionX: number, positionY: number, radius: number },) => {
  return distanceSquared(circle1.positionX, circle2.positionX, circle1.positionY, circle2.positionY) < (circle1.radius + circle2.radius) ** 2
}