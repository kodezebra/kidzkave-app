import * as PhosphorIcons from '@phosphor-icons/react'

function kebabToPascal(str: string): string {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('')
}

export function getIconComponent(name: string) {
  const pascalName = kebabToPascal(name) + 'Icon'
  return (PhosphorIcons as any)[pascalName]
}

export function renderDynamicIcon(name: string, className?: string) {
  if (!name) return null
  const Icon = getIconComponent(name)
  if (!Icon) return null
  return <Icon className={className} />
}
