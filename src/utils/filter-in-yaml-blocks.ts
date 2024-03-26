import type { Root, Yaml } from 'mdast'
import { is } from 'unist-util-is'

const filterInYAMLBloks = (tree: Root) => {
  const yamlNodes: Yaml[] = []

  tree.children.forEach((node) => {
    if (is(node, 'yaml')) {
      yamlNodes.push(node)
    }
  })

  return yamlNodes
}

export default filterInYAMLBloks
