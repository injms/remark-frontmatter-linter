import { defaultExtends } from '../defaults'

const overrideExtends = (xtnds: string | string[] = []): string | string[] => {
  const userExtends = Array.from(
    new Set(
      typeof xtnds === 'string' ? [xtnds] : xtnds
    )
  ).filter(item => item !== '')

  return userExtends.length >= 1 ? userExtends : defaultExtends
}

export default overrideExtends
