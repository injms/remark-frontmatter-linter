import test from 'ava'

import getFilePath from './get-file-path'

import type { VFile } from 'unified-lint-rule/lib'

test('that the correct filepath is returned', t => {
  t.plan(1)

  const mock = {
    history: [
      'this/is/a/wanted/filepath',
      'this/is/a/unwanted/filepath',
      'this/is/another/unwanted/filepath',
    ]
  } as VFile

  const test = getFilePath(mock)

  const expected = 'this/is/a/wanted/filepath'

  t.is(test, expected)
})

test('that it throws an error when VFile is empty', t => {
  t.plan(1)

  const mock = {} as VFile

  t.throws(() => getFilePath(mock))
})
