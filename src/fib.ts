const FIB_LIMIT = 1000;

export const fibonacciSet = new Set<bigint>([0n]);
export function isFibonacci(num: bigint): boolean {
  if (num < 0n) {
    return false;
  }
  if (fibonacciSet.has(num)) {
    return true;
  }

  let a = 0n;
  let b = 1n;

  while (b < num && fibonacciSet.size < FIB_LIMIT) {
    const temp = a + b;

    fibonacciSet.add(temp);

    a = b;
    b = temp;
  }

  return fibonacciSet.has(num);
}
