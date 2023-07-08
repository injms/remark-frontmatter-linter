import type { VFile } from 'unified-lint-rule/lib'

// VFile.history type is Array[]
const getFilePath = (file: VFile): string => file.history[0]

export default getFilePath
