import test from 'ava'
import * as all from './index'

test('that there are the correct number of exports', t => {
	t.plan(1)

  const test = Object.keys(all).length
  const expected = 5

  t.is(test, expected)
})

test('that all of the exports are functions', t => {
	t.plan(1)

  const test: string[] = Object.keys(all).map( key => typeof all[key] )
  const expected: string[] = [
    'function',
    'function',
    'function',
    'function',
    'function',
  ]

  t.deepEqual(test, expected)
})
