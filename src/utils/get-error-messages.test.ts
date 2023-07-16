import type { ESLint, Linter } from 'eslint'

import test from 'ava'

import getErrorMessages from './get-error-messages'

const lintMessages: Linter.LintMessage[] = [
  {
    column: 1,
    line: 1,
    endColumn: 10,
    endLine: 10,
    ruleId: 'test/rule-id-one',
    message: 'test-message-one',
    severity: 0,
  },
  {
    column: 2,
    line: 2,
    endColumn: 20,
    endLine: 20,
    ruleId: 'test/rule-id-two',
    message: 'test-message-two',
    severity: 1,
  },
  {
    column: 3,
    line: 3,
    endColumn: 30,
    endLine: 30,
    ruleId: 'test/rule-id-three',
    message: 'test-message-three',
    severity: 2,
  },
  {
    column: 4,
    line: 4,
    endColumn: 40,
    endLine: 40,
    ruleId: 'test/rule-id-four',
    message: 'test-message-four',
    severity: 2,
  },
  {
    column: 5,
    line: 5,
    endColumn: 50,
    endLine: 50,
    ruleId: 'test/rule-id-five',
    message: 'test-message-five',
    severity: 2,
  },
  {
    column: 6,
    line: 6,
    endColumn: 60,
    endLine: 60,
    ruleId: 'test/rule-id-six',
    message: 'test-message-six',
    severity: 1,
  },
]

const lintResultNoErrors: ESLint.LintResult[] = [{
  filePath: 'test-file-path',
  messages: [],
  suppressedMessages: [],
  errorCount: 0,
  fatalErrorCount: 0,
  warningCount: 0,
  fixableErrorCount: 0,
  fixableWarningCount: 0,
  output: 'output',
  source: 'source',
  usedDeprecatedRules: [],
},
{
  filePath: 'test-file-path-two',
  messages: [],
  suppressedMessages: [],
  errorCount: 0,
  fatalErrorCount: 0,
  warningCount: 0,
  fixableErrorCount: 0,
  fixableWarningCount: 0,
  output: 'output',
  source: 'source',
  usedDeprecatedRules: [],
},
{
  filePath: 'test-file-path-three',
  messages: [],
  suppressedMessages: [],
  errorCount: 0,
  fatalErrorCount: 0,
  warningCount: 0,
  fixableErrorCount: 0,
  fixableWarningCount: 0,
  output: 'output',
  source: 'source',
  usedDeprecatedRules: [],
},
{
  filePath: 'test-file-path-two-four',
  messages: [],
  suppressedMessages: [],
  errorCount: 0,
  fatalErrorCount: 0,
  warningCount: 0,
  fixableErrorCount: 0,
  fixableWarningCount: 0,
  output: 'output',
  source: 'source',
  usedDeprecatedRules: [],
}]

const lintResultWithError: ESLint.LintResult[] = [{
  filePath: 'test-file-path',
  messages: lintMessages.slice(0, 1),
  suppressedMessages: [],
  errorCount: 0,
  fatalErrorCount: 0,
  warningCount: 0,
  fixableErrorCount: 0,
  fixableWarningCount: 0,
  output: 'output',
  source: 'source',
  usedDeprecatedRules: [],
}]

const lintResultWithErrors: ESLint.LintResult[] = [{
  filePath: 'test-file-path',
  messages: lintMessages.slice(0, 2),
  suppressedMessages: [],
  errorCount: 0,
  fatalErrorCount: 0,
  warningCount: 0,
  fixableErrorCount: 0,
  fixableWarningCount: 0,
  output: 'output',
  source: 'source',
  usedDeprecatedRules: [],
},
{
  filePath: 'test-file-path-two',
  messages: lintMessages.slice(1, 3),
  suppressedMessages: [],
  errorCount: 0,
  fatalErrorCount: 0,
  warningCount: 0,
  fixableErrorCount: 0,
  fixableWarningCount: 0,
  output: 'output',
  source: 'source',
  usedDeprecatedRules: [],
},
{
  filePath: 'test-file-path-three',
  messages: lintMessages.slice(2, -1),
  suppressedMessages: [],
  errorCount: 0,
  fatalErrorCount: 0,
  warningCount: 0,
  fixableErrorCount: 0,
  fixableWarningCount: 0,
  output: 'output',
  source: 'source',
  usedDeprecatedRules: [],
},
{
  filePath: 'test-file-path-two-four',
  messages: lintMessages,
  suppressedMessages: [],
  errorCount: 0,
  fatalErrorCount: 0,
  warningCount: 0,
  fixableErrorCount: 0,
  fixableWarningCount: 0,
  output: 'output',
  source: 'source',
  usedDeprecatedRules: [],
}]

test('that empty arrays are returned for no errors for multiple files', t => {
  t.plan(2)

  t.deepEqual(
    getErrorMessages(lintResultNoErrors.slice(0, 2)),
    [],
  )

  t.deepEqual(
    getErrorMessages(lintResultNoErrors),
    []
  )
})

test('that a single empty array are returned for no errors for a single files', t => {
  t.plan(1)

  const test = getErrorMessages(lintResultNoErrors.slice(0, 1))
  const expected = []

  t.deepEqual(test, expected)
})

test('that an array of arrays of messages is returned for a single error', t => {
  t.plan(1)
  const test = getErrorMessages(lintResultWithError)

  t.is(test.length, 1)
})

test('that an array of arrays of messages is returned for multiple errors', t => {
  t.plan(1)

  const test = getErrorMessages(lintResultWithErrors)

  t.is(test.length, 13)
})

test('that the messages are returned in the expected format', t => {
  t.plan(13)

  const test = getErrorMessages(lintResultWithErrors)
  const expectedKeys = ['message', 'position', 'nameAndRule']

  test.forEach( message => {
    const keys = Object.keys(message)

    t.deepEqual(keys, expectedKeys)
  })
})
