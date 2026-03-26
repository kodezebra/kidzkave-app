import * as PhosphorIcons from '@phosphor-icons/react'

function kebabToPascal(str: string): string {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('')
}

export function renderDynamicIcon(name: string, className?: string) {
  if (!name) return null
  const pascalName = kebabToPascal(name) + 'Icon'
  const Icon = (PhosphorIcons as any)[pascalName]
  if (!Icon) return null
  return <Icon className={className} />
}

export { PhosphorIcons }
