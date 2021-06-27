/**
 * Returns the displaced distance in CM
 */
export const calcDisplacement = (
  currentAccel: number,
  currentVelocity: number,
  timeInSeconds: number
) =>
  currentVelocity * timeInSeconds + 0.5 * (currentAccel * timeInSeconds ** 2);
