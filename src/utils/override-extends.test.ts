import test from 'ava'
import overrideExtends from './override-extends'

test('that an empty string returns the default', t => {
  t.plan(1)

  const test = overrideExtends('')
  const expected = ['plugin:yml/standard']

  t.deepEqual(test, expected)
})

test('that an empty array returns the default', t => {
  t.plan(1)

  const test = overrideExtends([])
  const expected = ['plugin:yml/standard']

  t.deepEqual(test, expected)
})

test('that undefiend returns the default', t => {
  t.plan(1)

  const test = overrideExtends(undefined)
  const expected = ['plugin:yml/standard']

  t.deepEqual(test, expected)
})

test('that a string only returns that override', t => {
  t.plan(1)

  const test = overrideExtends('plugin:something/non-standard')
  const expected = ['plugin:something/non-standard']

  t.deepEqual(test, expected)
})

test('that an array only returns those overrides', t => {
  t.plan(1)

  const test = overrideExtends([
    'plugin:something/non-standard',
    'plugin:something-else-as-well',
  ])
  const expected = [
    'plugin:something/non-standard',
    'plugin:something-else-as-well',
  ]

  t.deepEqual(test, expected)
})

test('that overrideExtends utility returns a deduped array', t => {
  t.plan(1)

  const test = overrideExtends([
    'plugin:something/non-standard',
    'plugin:something/non-standard',
    'plugin:something-else-as-well',
    'plugin:something-else-as-well',
  ])
  const expected = [
    'plugin:something/non-standard',
    'plugin:something-else-as-well',
  ]

  t.deepEqual(test, expected)
})
