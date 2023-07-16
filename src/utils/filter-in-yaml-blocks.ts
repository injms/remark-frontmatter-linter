import type { Root, Content, YAML } from 'mdast'
import { is } from 'unist-util-is'

const filterInYAMLBloks = (tree: Root): YAML[] => {
  const yamlNodes: Content[] = tree.children.filter((node) => is<YAML>(node, 'yaml'))

  return yamlNodes as YAML[]
}

export default filterInYAMLBloks
