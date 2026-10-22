const test = require('node:test');
const assert = require('node:assert/strict');
const braces = require('./');

test('preserves ordinary ranges and nested brace patterns', () => {
  assert.deepEqual(braces.expand('file-{1..3}.ts'), ['file-1.ts', 'file-2.ts', 'file-3.ts']);
  assert.deepEqual(braces.expand('{a,{b,c}}'), ['a', 'b', 'c']);
  assert.equal(braces.compile('{a,b}'), '(a|b)');
});
test('rejects deeply nested and unclosed input before recursive AST walking', () => {
  for (const input of ['{'.repeat(4000) + 'a' + '}'.repeat(4000), '{'.repeat(4000), '('.repeat(4000) + 'a' + ')'.repeat(4000)]) {
    for (const method of ['parse', 'compile', 'expand', 'stringify']) {
      assert.throws(() => braces[method](input), error => error instanceof SyntaxError && /depth/.test(error.message));
    }
  }
});
test('rejects malicious prebuilt ASTs without overflowing the stack', () => {
  let deep = { type: 'text', value: 'x' };
  for (let i = 0; i < 4000; i++) deep = { type: 'root', nodes: [deep] };
  const cycle = { type: 'root', nodes: [] }; cycle.nodes.push(cycle);
  for (const ast of [deep, cycle]) {
    for (const method of ['compile', 'expand', 'stringify']) {
      assert.throws(() => braces[method](ast), SyntaxError);
    }
  }
});
