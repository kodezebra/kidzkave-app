import { Icon } from '@iconify/react';

export interface IconEntry {
  name: string
  label: string
  icon: string
}

export function getIconComponent(name: string) {
  return (props: any) => <Icon icon={`iconoir:${name}`} {...props} />;
}

export function renderDynamicIcon(name: string, className?: string, color?: string) {
  if (!name) return null;
  return <Icon icon={`iconoir:${name}`} className={className} style={color ? { color } : undefined} />;
}
