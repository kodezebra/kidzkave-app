import { raw } from 'hono/html'

function kebabToPascal(str: string): string {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('')
}

export const getPadding = (styles: any) => {
  if (styles?.paddingY !== undefined) return { paddingTop: `${styles.paddingY}px`, paddingBottom: `${styles.paddingY}px` }
  return {}
}

export function Icon({ name, className }: { name: string; className?: string }) {
  return raw(`<i class="ph ph-${name} ${className || ''}"></i>`)
}

export function IconSvg({ icon, className }: { icon: string; className?: string }) {
  const iconName = icon.replace('ph:', '')
  return raw(`<i class="ph ph-${iconName} ${className || ''}"></i>`)
}

export function renderIcon(iconName: string, className: string = ''): string {
  return `<i class="ph ph-${iconName} ${className}"></i>`
}

export function getPhosphorIconComponent(iconName: string): string {
  return iconName
}
