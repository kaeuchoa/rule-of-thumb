import { getPercentage } from '../getPercentage';

describe('getPercentage function', () => {
  it('should return 0 when totalVotes is 0', () => {
    const votes = 0;
    const totalVotes = 0;
    const result = getPercentage(votes, totalVotes);
    expect(result).toBe(0);
  });

  it('should calculate the correct percentage when votes are less than totalVotes', () => {
    const votes = 3;
    const totalVotes = 10;
    const result = getPercentage(votes, totalVotes);
    expect(result).toBe(30);
  });

  it('should calculate the correct percentage when votes are equal to totalVotes', () => {
    const votes = 5;
    const totalVotes = 5;
    const result = getPercentage(votes, totalVotes);
    expect(result).toBe(100);
  });

  it('should handle floating point percentages and round to the nearest integer', () => {
    const votes = 2;
    const totalVotes = 7;
    const result = getPercentage(votes, totalVotes);
    expect(result).toBe(29); // (2 / 7) * 100 ≈ 28.57 ≈ 29
  });

  it('should handle large numbers and round to the nearest integer', () => {
    const votes = 123456;
    const totalVotes = 789123;
    const result = getPercentage(votes, totalVotes);
    expect(result).toBe(16); // (123456 / 789123) * 100 ≈ 15.6524 ≈ 16
  });
});
