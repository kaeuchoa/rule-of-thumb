import { ellipsizeText } from '../ellipsizeText';

describe('ellipsizeText function', () => {
  it('should return the original text when length is less than or equal to maxLength', () => {
    const text = 'Hello, world!';
    const maxLength = 20;
    const result = ellipsizeText(text, maxLength);
    expect(result).toBe(text);
  });

  it('should ellipsize the text and append "..." when length is greater than maxLength', () => {
    const text = 'This is a long piece of text that needs ellipsizing.';
    const maxLength = 20;
    const result = ellipsizeText(text, maxLength);
    const expected = 'This is a long pie...';
    expect(result).toBe(expected);
  });

  it('should handle empty string input', () => {
    const text = '';
    const maxLength = 10;
    const result = ellipsizeText(text, maxLength);
    expect(result).toBe(text);
  });

  it('should handle maxLength of 0', () => {
    const text = 'Hello, world!';
    const maxLength = 0;
    const result = ellipsizeText(text, maxLength);
    expect(result).toBe('...');
  });

  it('should handle maxLength greater than text length', () => {
    const text = 'Short text';
    const maxLength = text.length + 10;
    const result = ellipsizeText(text, maxLength);
    expect(result).toBe(text);
  });
});
