import { formatTimePeriod } from '../formatTimePeriod';

describe('formatTimePeriod function', () => {
  it('should return "0 days" for input less than 1', () => {
    const result = formatTimePeriod(0);
    expect(result).toBe('0 days');
  });

  it('should return "1 day" for input equal 1', () => {
    const result = formatTimePeriod(1);
    expect(result).toBe('1 day');
  });

  it('should return "1 month" for input equal 30', () => {
    const result = formatTimePeriod(30);
    expect(result).toBe('1 month');
  });

  it('should return formatted string for days less than 30', () => {
    const result = formatTimePeriod(15);
    expect(result).toBe('15 days');
  });

  it('should return formatted string for days less than 365', () => {
    const result = formatTimePeriod(60);
    expect(result).toBe('2 months');
  });

  it('should return formatted string for days greater than or equal to 365', () => {
    const result = formatTimePeriod(400);
    expect(result).toBe('1 year');
  });
});
