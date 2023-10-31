export const isANumber = (input: string): boolean => {
  return !isNaN(Number(input));
};

export const isInRange = (input: number, min: number, max: number): boolean => {
  return input >= min && input <= max;
};

export const isNotZero = (input: number): boolean => {
  return input !== 0;
};

export const containsNoDecimal = (input: string): boolean => {
  return !input.includes(".");
};

export const inputIsValid = (
  input: string,
  min: number,
  max: number
): boolean => {
  return (
    isANumber(input) &&
    isInRange(Number(input), min, max) &&
    isNotZero(Number(input)) &&
    containsNoDecimal(input)
  );
};
