import test from 'ava'

import filterInYAMLBlocks from './filter-in-yaml-blocks'

import type { Root } from 'mdast'

const noFrontmatterPresent: Root = {
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [
        {
          type: 'text',
          value: 'A test markdown file',
          position: {
            start: {
              line: 17,
              column: 3,
              offset: 240
            },
            end: {
              line: 17,
              column: 23,
              offset: 260
            }
          }
        }
      ],
      position: {
        start: {
          line: 17,
          column: 1,
          offset: 238
        },
        end: {
          line: 17,
          column: 23,
          offset: 260
        }
      }
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: 'With frontmatter present.',
          position: {
            start: {
              line: 19,
              column: 1,
              offset: 262
            },
            end: {
              line: 19,
              column: 26,
              offset: 287
            }
          }
        }
      ],
      position: {
        start: {
          line: 19,
          column: 1,
          offset: 262
        },
        end: {
          line: 19,
          column: 26,
          offset: 287
        }
      }
    },
    {
      type: 'blockquote',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              value: 'But a variety of things in the document.',
              position: {
                start: {
                  line: 21,
                  column: 3,
                  offset: 291
                },
                end: {
                  line: 21,
                  column: 43,
                  offset: 331
                }
              }
            }
          ],
          position: {
            start: {
              line: 21,
              column: 3,
              offset: 291
            },
            end: {
              line: 21,
              column: 43,
              offset: 331
            }
          }
        }
      ],
      position: {
        start: {
          line: 21,
          column: 1,
          offset: 289
        },
        end: {
          line: 21,
          column: 43,
          offset: 331
        }
      }
    },
    {
      type: 'code',
      lang: 'html',
      meta: null,
      value: '<p>Super code example</p>',
      position: {
        start: {
          line: 23,
          column: 1,
          offset: 333
        },
        end: {
          line: 25,
          column: 4,
          offset: 370
        }
      }
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'link',
          title: null,
          url: 'https://example.com',
          children: [
            {
              type: 'text',
              value: 'And a link',
              position: {
                start: {
                  line: 27,
                  column: 2,
                  offset: 373
                },
                end: {
                  line: 27,
                  column: 12,
                  offset: 383
                }
              }
            }
          ],
          position: {
            start: {
              line: 27,
              column: 1,
              offset: 372
            },
            end: {
              line: 27,
              column: 34,
              offset: 405
            }
          }
        },
        {
          type: 'text',
          value: ' to somewhere else.',
          position: {
            start: {
              line: 27,
              column: 34,
              offset: 405
            },
            end: {
              line: 27,
              column: 53,
              offset: 424
            }
          }
        }
      ],
      position: {
        start: {
          line: 27,
          column: 1,
          offset: 372
        },
        end: {
          line: 27,
          column: 53,
          offset: 424
        }
      }
    },
    {
      type: 'heading',
      depth: 2,
      children: [
        {
          type: 'text',
          value: 'Secondary heading',
          position: {
            start: {
              line: 29,
              column: 4,
              offset: 429
            },
            end: {
              line: 29,
              column: 21,
              offset: 446
            }
          }
        }
      ],
      position: {
        start: {
          line: 29,
          column: 1,
          offset: 426
        },
        end: {
          line: 29,
          column: 21,
          offset: 446
        }
      }
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: 'And some more example text.',
          position: {
            start: {
              line: 31,
              column: 1,
              offset: 448
            },
            end: {
              line: 31,
              column: 28,
              offset: 475
            }
          }
        }
      ],
      position: {
        start: {
          line: 31,
          column: 1,
          offset: 448
        },
        end: {
          line: 31,
          column: 28,
          offset: 475
        }
      }
    }
  ],
  position: {
    start: {
      line: 1,
      column: 1,
      offset: 0
    },
    end: {
      line: 33,
      column: 1,
      offset: 477
    }
  }
}

const frontmatterPresent: Root = {
  type: 'root',
  children: [
    {
      type: 'yaml',
      value: `key: a string
number: 1
and_a_list:
  - of things
  - that are
  - listed
and_a_object:
  thing: other
  other_thing: Something else
longer_text: |
  That can be spread over
  multiple lines
true_or_false: false
country_code: no`,
      position: {
        start: {
          line: 1,
          column: 1,
          offset: 0
        },
        end: {
          line: 16,
          column: 4,
          offset: 237,
        }
      }
    },
    {
      type: 'heading',
      depth: 1,
      children: [
        {
          type: 'text',
          value: 'A test markdown file',
          position: {
            start: {
              line: 17,
              column: 3,
              offset: 240
            },
            end: {
              line: 17,
              column: 23,
              offset: 260
            }
          }
        }
      ],
      position: {
        start: {
          line: 17,
          column: 1,
          offset: 238
        },
        end: {
          line: 17,
          column: 23,
          offset: 260
        }
      }
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: 'With frontmatter present.',
          position: {
            start: {
              line: 19,
              column: 1,
              offset: 262
            },
            end: {
              line: 19,
              column: 26,
              offset: 287
            }
          }
        }
      ],
      position: {
        start: {
          line: 19,
          column: 1,
          offset: 262
        },
        end: {
          line: 19,
          column: 26,
          offset: 287
        }
      }
    },
    {
      type: 'blockquote',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              value: 'But a variety of things in the document.',
              position: {
                start: {
                  line: 21,
                  column: 3,
                  offset: 291
                },
                end: {
                  line: 21,
                  column: 43,
                  offset: 331
                }
              }
            }
          ],
          position: {
            start: {
              line: 21,
              column: 3,
              offset: 291
            },
            end: {
              line: 21,
              column: 43,
              offset: 331
            }
          }
        }
      ],
      position: {
        start: {
          line: 21,
          column: 1,
          offset: 289
        },
        end: {
          line: 21,
          column: 43,
          offset: 331
        }
      }
    },
    {
      type: 'code',
      lang: 'html',
      meta: null,
      value: '<p>Super code example</p>',
      position: {
        start: {
          line: 23,
          column: 1,
          offset: 333
        },
        end: {
          line: 25,
          column: 4,
          offset: 370
        }
      }
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'link',
          title: null,
          url: 'https://example.com',
          children: [
            {
              type: 'text',
              value: 'And a link',
              position: {
                start: {
                  line: 27,
                  column: 2,
                  offset: 373
                },
                end: {
                  line: 27,
                  column: 12,
                  offset: 383
                }
              }
            }
          ],
          position: {
            start: {
              line: 27,
              column: 1,
              offset: 372
            },
            end: {
              line: 27,
              column: 34,
              offset: 405
            }
          }
        },
        {
          type: 'text',
          value: ' to somewhere else.',
          position: {
            start: {
              line: 27,
              column: 34,
              offset: 405
            },
            end: {
              line: 27,
              column: 53,
              offset: 424
            }
          }
        }
      ],
      position: {
        start: {
          line: 27,
          column: 1,
          offset: 372
        },
        end: {
          line: 27,
          column: 53,
          offset: 424
        }
      }
    },
    {
      type: 'heading',
      depth: 2,
      children: [
        {
          type: 'text',
          value: 'Secondary heading',
          position: {
            start: {
              line: 29,
              column: 4,
              offset: 429
            },
            end: {
              line: 29,
              column: 21,
              offset: 446
            }
          }
        }
      ],
      position: {
        start: {
          line: 29,
          column: 1,
          offset: 426
        },
        end: {
          line: 29,
          column: 21,
          offset: 446
        }
      }
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: 'And some more example text.',
          position: {
            start: {
              line: 31,
              column: 1,
              offset: 448
            },
            end: {
              line: 31,
              column: 28,
              offset: 475
            }
          }
        }
      ],
      position: {
        start: {
          line: 31,
          column: 1,
          offset: 448
        },
        end: {
          line: 31,
          column: 28,
          offset: 475
        }
      }
    }
  ],
  position: {
    start: {
      line: 1,
      column: 1,
      offset: 0
    },
    end: {
      line: 33,
      column: 1,
      offset: 477
    }
  }
}

test('that it only returns YAML blocks', t => {
  t.plan(1)

  const test = filterInYAMLBlocks(frontmatterPresent)

  const expected = [{
    type: 'yaml',
    value: `key: a string
number: 1
and_a_list:
  - of things
  - that are
  - listed
and_a_object:
  thing: other
  other_thing: Something else
longer_text: |
  That can be spread over
  multiple lines
true_or_false: false
country_code: no`,
    position: {
      start: {
        line: 1,
        column: 1,
        offset: 0
      },
      end: {
        line: 16,
        column: 4,
        offset: 237,
      }
    }
  }]

  t.deepEqual(test, expected)
})

test('that nothing is returned if no frontmatter is present', t => {
  t.plan(1)

  const test = filterInYAMLBlocks(noFrontmatterPresent)

  const expected = []

  t.deepEqual(test, expected)
})
