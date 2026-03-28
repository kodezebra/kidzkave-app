import { raw } from 'hono/html';
import { renderIconSvg, iconMap } from '@/lib/icon-renderer';

export const getPadding = (styles: any) => {
  if (styles?.paddingY !== undefined) return { paddingTop: `${styles.paddingY}px`, paddingBottom: `${styles.paddingY}px` }
  return {}
}

function parseClassName(className: string): { size?: number; color?: string; classes: string[] } {
  const classes = className.split(' ').filter(Boolean);
  let size: number | undefined;
  let color: string | undefined;
  const remaining: string[] = [];
  
  for (const cls of classes) {
    const textMatch = cls.match(/^text-(\d+)x?$/);
    if (textMatch) {
      size = parseInt(textMatch[1]) * 4;
      continue;
    }
    const wMatch = cls.match(/^w-(\d+)$/);
    if (wMatch) {
      size = parseInt(wMatch[1]) * 4;
      continue;
    }
    if (cls.startsWith('text-') && !cls.includes('/')) {
      color = cls.replace('text-', '').replace(/-\d+/, '');
      remaining.push(cls);
      continue;
    }
    remaining.push(cls);
  }
  
  return { size, color, classes: remaining };
}

export function Icon({ name, className }: { name: string; className?: string }) {
  const { size, classes } = parseClassName(className || '');
  return raw(renderIconSvg(name, { size, className: classes.join(' ') }));
}

export function IconSvg({ icon, className }: { icon: string; className?: string }) {
  const { size, classes } = parseClassName(className || '');
  return raw(renderIconSvg(icon, { size, className: classes.join(' ') }));
}

export function renderIcon(iconName: string, className: string = 'text-2xl'): string {
  const { size, classes } = parseClassName(className);
  return renderIconSvg(iconName, { size, className: classes.join(' ') });
}

export { iconMap };
