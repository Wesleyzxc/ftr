import { fibonacciSet, isFibonacci } from "../fib";

describe("fib", () => {
  afterEach(() => {
    fibonacciSet.clear();
  });

  it.each([0n, 3n])("should return true for %s", (n) => {
    expect(isFibonacci(n)).toEqual(true);
  });

  it("should return true up to the 1000th number", () => {
    expect(
      isFibonacci(
        43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875n,
      ),
    ).toEqual(true);
  });

  it("should return false for the 1001th number", () => {
    expect(
      isFibonacci(
        70330367711422815821835254877183549770181269836358732742604905087154537118196933579742249494562611733487750449241765991088186363265450223647106012053374121273867339111198139373125598767690091902245245323403501n,
      ),
    ).toEqual(true);
  });

  it("should not return for 1001th fibonnaci number", () => {
    expect(isFibonacci(-5n)).toEqual(false);
  });
});
