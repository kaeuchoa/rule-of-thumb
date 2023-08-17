import { getTimeDiff } from '../getTimeDiff';

describe('getTimeDiff function', () => {
  it('should return 0 when given the current date', () => {
    const currentDate = new Date();
    const result = getTimeDiff(currentDate);
    expect(result).toBe(0);
  });

  it('should return the correct number of days passed for a past date', () => {
    const inputDate = new Date('2023-01-01');
    const result = getTimeDiff(inputDate);
    expect(result).toBe(228);
  });

  it('should return a negative number for a future date', () => {
    const futureDate = new Date('2030-12-31');
    const result = getTimeDiff(futureDate);
    expect(result).toBeLessThan(0);
  });
});
