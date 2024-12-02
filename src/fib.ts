const FIB_LIMIT = 1000;

export const generateFibonacci = (limit = FIB_LIMIT) => {
  const fibSet = new Set<number>();
  let a = 0;
  let b = 1;
  while (a <= limit) {
    fibSet.add(a);
    [a, b] = [b, a + b];
  }
  return fibSet;
};

export const fibonacciSet = generateFibonacci();
