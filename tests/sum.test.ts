const sumClass = require('../src/sum')

test('adds 1 + 2 to equal 3', () => {
  expect(sumClass(1, 2)).toBe(3);
});