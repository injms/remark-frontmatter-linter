import test from 'ava'

import { read } from 'to-vfile'
import { reporter } from 'vfile-reporter'
import { remark } from 'remark'
import remarkLint from 'remark-lint'
import remarkFrontmatter from 'remark-frontmatter'

import frontmatterLinter from './index'

const oneFrontmatterBlockPresent = read('./test-fixtures/one-frontmatter-block-present.md')
const noFrontmatterBlockPresent = read('./test-fixtures/no-frontmatter-blocks-present.md')

test('that plugin can be set up without options', t => {
	t.plan(1)

	t.notThrows(() => frontmatterLinter())
})

test('that plugin can be set up an empty object', t => {
	t.plan(1)

	t.notThrows(() => frontmatterLinter({}))
})

test('that plugin can be set up an ESLint config object', t => {
	t.plan(1)

	t.notThrows(() => frontmatterLinter({ extends: ['plugin:yml/standard'] }))
})

test("that plugin doesn't throw with one YAML block present", async t => {
	t.plan(1)

	await t.notThrowsAsync(
    async () => {
      await remark()
        .use(remarkLint)
        .use(remarkFrontmatter)
        .use(frontmatterLinter)
        .process(await oneFrontmatterBlockPresent)
    }
  )
})

test("that plugin doesn't throw with no YAML blocks present", async t => {
	t.plan(1)

	await t.notThrowsAsync(
    async () => {
      await remark()
        .use(remarkLint)
        .use(remarkFrontmatter)
        .use(frontmatterLinter)
        .process(await noFrontmatterBlockPresent)
    }
  )
})

test("that no errors are returned when given correctly formatted frontmatter", async t => {
	t.plan(1)

  const test = await remark()
    .use(remarkLint)
    .use(remarkFrontmatter)
    .use(frontmatterLinter)
    .process(await oneFrontmatterBlockPresent)

  t.is(test.messages.length, 0)
})

test("that error messages are returned when given incorrectly formatted frontmatter", async t => {
	t.plan(7)

  const test = await remark()
    .use(remarkLint)
    .use(remarkFrontmatter)
    .use(frontmatterLinter)
    .process(await read('./test-fixtures/one-frontmatter-block-present-with-errors.md'))

  const report = reporter(test)


  t.is(test.messages.length, 6)
  t.is(test.messages[0].message, 'Must use plain style scalar.')
  t.is(test.messages[1].message, 'Expected indentation of 2 spaces but found 4 spaces.')
  t.is(test.messages[2].message, 'Expected indentation of 4 spaces but found 6 spaces.')
  t.is(test.messages[3].message, 'Expected indentation of 4 spaces but found 6 spaces.')
  t.is(test.messages[4].message, 'Must use plain style scalar.')
  t.is(test.messages[5].message, 'Must use plain style scalar.')
})
