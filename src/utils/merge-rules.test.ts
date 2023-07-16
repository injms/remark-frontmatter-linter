import test from 'ava'
import mergeRules from './merge-rules'

test('that undefined will return the default rules', t => {
	t.plan(1)

	const test = mergeRules()

	const expected = {
		indent: [ 'error', 2 ]
	}

	t.deepEqual(test, expected)
})

test('that an empty object will return the default rules', t => {
	t.plan(1)

	const test = mergeRules({})

	const expected = {
		indent: [ 'error', 2 ]
	}

	t.deepEqual(test, expected)
})

test('that a correctly merged object is returned', t => {
	t.plan(1)

	const test = mergeRules({
		'block-mapping-question-indicator-newline': [ 'error' ],
		'no-empty-key': [ 'off' ],
	})

	const expected = {
		indent: [ 'error', 2 ],
		'block-mapping-question-indicator-newline': [ 'error' ],
		'no-empty-key': [ 'off' ],
	}

	t.deepEqual(test, expected)
})

test('that a correctly merged object is returned with correctly overriden keys', t => {
	t.plan(1)

	const test = mergeRules({
		'block-mapping-question-indicator-newline': [ 'error' ],
		'no-empty-key': [ 'off' ],
		indent: [ 'warn', 8 ],
	})

	const expected = {
		indent: [ 'warn', 8 ],
		'block-mapping-question-indicator-newline': [ 'error' ],
		'no-empty-key': [ 'off' ],
	}

	t.deepEqual(test, expected)
})
