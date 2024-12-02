import { generateFibonacci } from "../fib";

describe('fib', () => {
    it('should return up to limit', () => {
        expect(generateFibonacci(3)).toEqual(new Set([0, 1, 2, 3]));
    })

    it('should return up to default limit', () => {
        expect(generateFibonacci()).toEqual(new Set([0, 1, 13, 144, 2, 21, 233, 3, 34, 377, 5, 55, 610, 8, 89, 987]));
    })

    it('should deal with negatives', () => {
        expect(generateFibonacci(-5)).toEqual(new Set());
    });

    it('should deal with NaN', () => {
        expect(generateFibonacci(Number.NaN)).toEqual(new Set());
    });
})