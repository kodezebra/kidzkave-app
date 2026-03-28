import { getIconData, iconToSVG, iconToHTML, replaceIDs } from '@iconify/utils';
import iconoirIcons from '@iconify-json/iconoir/icons.json';
import lucideIcons from '@iconify-json/lucide/icons.json';

type IconifyJSON = {
  prefix: string;
  icons: Record<string, { body: string }>;
  aliases?: Record<string, { parent: string }>;
  width?: number;
  height?: number;
};

export const iconMap: Record<string, string> = {
  // Navigation & Actions
  ArrowLeft: 'arrow-left',
  ArrowUp: 'arrow-up',
  ArrowDown: 'arrow-down',
  ArrowRight: 'arrow-right',
  ChevronRight: 'nav-arrow-right-solid',
  ChevronDown: 'nav-arrow-down-solid',
  ChevronUp: 'nav-arrow-up-solid',
  ChevronRightIcon: 'nav-arrow-right-solid',
  ChevronDownIcon: 'nav-arrow-down-solid',
  ChevronUpIcon: 'nav-arrow-up-solid',
  Home: 'home',
  Menu: 'menu',
  Reply: 'arrow-left',

  // UI Actions
  Plus: 'plus',
  PlusCircle: 'plus-circle-solid',
  Minus: 'minus',
  Check: 'check',
  CheckIcon: 'check',
  X: 'xmark',
  XIcon: 'xmark',
  Close: 'xmark',

  // Status
  CheckCircle: 'check-circle-solid',
  CheckCircle2: 'check-circle-solid',
  CheckSquare: 'check-square-solid',
  AlertCircle: 'warning-circle-solid',
  AlertTriangle: 'warning-triangle-solid',
  Info: 'info-circle-solid',
  HelpCircle: 'help-circle-solid',
  CircleHelp: 'help-circle-solid',

  // Communication
  Mail: 'mail',
  Phone: 'phone',
  MapPin: 'map-pin',
  Map: 'map',
  MapIcon: 'map',
  Navigation: 'compass',
  Bell: 'bell',
  MessageCircle: 'chat-bubble',
  MessageSquare: 'chat-bubble-text',
  Megaphone: 'megaphone',

  // Actions
  Search: 'search',
  Filter: 'filter',
  ListFilter: 'filter',
  List: 'list',
  Link: 'link',
  LinkIcon: 'link',
  Copy: 'copy',
  Clipboard: 'clipboard',
  Edit: 'edit',
  Pencil: 'edit',
  PencilLine: 'design-pencil',
  Trash: 'trash',
  Trash2: 'trash',
  Upload: 'upload',
  Download: 'download',
  Save: 'save-floppy',
  Share2: 'share-android',
  Eye: 'eye',
  EyeSlash: 'eye-solid',
  Lock: 'lock',
  Key: 'key',
  Shield: 'shield',
  ShieldCheck: 'shield-check',
  RefreshCw: 'refresh',
  RotateCcw: 'undo',
  Undo2: 'undo',
  Redo2: 'redo',

  // Time & Calendar
  Clock: 'clock',
  Calendar: 'calendar',
  Alarm: 'alarm',
  Timer: 'timer',

  // People & Users
  User: 'user',
  UserPlus: 'user-plus-solid',
  Users: 'users',
  UsersRound: 'user',
  UserCheck: 'user-check',

  // School & Education
  GraduationCap: 'graduation-cap',
  Book: 'book',
  BookOpen: 'book',
  BookMarked: 'bookmark',
  Receipt: 'receipt',
  Briefcase: 'briefcase',

  // Media & Files
  Image: 'media-image',
  ImageIcon: 'media-image',
  ImagePlay: 'play-solid',
  Images: 'images',
  Camera: 'camera',
  Folder: 'folder',
  FolderOpen: 'folder-open',
  File: 'file',
  FileText: 'file',
  Archive: 'archive',

  // Commerce & Money
  Banknote: 'bank',
  DollarSign: 'dollar',
  CircleDollar: 'dollar-circle-solid',
  ShoppingCart: 'cart',
  Wallet: 'wallet',
  Bank: 'bank',

  // Settings & Tools
  Settings: 'settings',
  Settings2: 'settings',
  Globe: 'globe',
  ExternalLink: 'external-link',
  Rocket: 'rocket',
  Sun: 'sun-light',
  Moon: 'moon-sat',
  Building2: 'building',
  Palette: 'palette',
  LayoutTemplate: 'layout',
  Layout: 'layout',
  LayoutGrid: 'grid-2x2',
  LayoutDashboard: 'dashboard',
  Box: 'box',
  Package: 'package',
  Grip: 'drag',

  // Social Media
  Facebook: 'facebook',
  facebook: 'facebook',
  Instagram: 'instagram',
  instagram: 'instagram',
  Twitter: 'twitter',
  twitter: 'twitter',
  Youtube: 'youtube',
  youtube: 'youtube',
  LinkedIn: 'linkedin',
  linkedin: 'linkedin',
  WhatsApp: 'whatsapp',
  whatsapp: 'whatsapp',
  TikTok: 'tiktok',
  tiktok: 'tiktok',
  Discord: 'discord',
  Telegram: 'telegram',
  Reddit: 'reddit',
  Pinterest: 'pinterest',
  Snapchat: 'snapchat',
  Threads: 'threads',
  Twitch: 'twitch',
  Slack: 'slack',

  // Miscellaneous
  Star: 'star',
  Heart: 'heart',
  Flag: 'flag',
  Crown: 'crown',
  Zap: 'lightning',
  Sparkles: 'spark',
  Layers: 'layers',
  MousePointer2: 'cursor',
  Printer: 'printer',
  Smile: 'smiley',
  ChartPie: 'chart-bar',
  BarChart3: 'chart-bar',
  Percent: 'percent',
  Paperclip: 'attachment',
  Tags: 'tag',
  SlidersHorizontal: 'slider-horizontal',
  Inbox: 'inbox',
  Scale: 'scales',
  ScrollText: 'scroll',
  PanelLeft: 'sidebar',
  PanelRight: 'sidebar',
  Monitor: 'monitor',
  Tablet: 'tablet',
  Smartphone: 'smartphone',
  Type: 'text',
  LogOut: 'log-out',

  // School specific
  bus: 'bus',
  ruler: 'ruler',
  calculator: 'calculator',
  testTube: 'test-tube',
  mathBook: 'math-book',
  atom: 'atom',
  flask: 'flask',
  musicNote: 'music-note',
};

function findIcon(name: string, iconSet: IconifyJSON): { body: string; width?: number; height?: number } | null {
  const iconData = getIconData(iconSet as any, name);
  if (iconData) return iconData;

  const variations = [`${name}-solid`, `${name}-outline`];
  for (const variant of variations) {
    const d = getIconData(iconSet as any, variant);
    if (d) return d;
  }
  return null;
}

function renderSvg(
  name: string,
  iconSet: IconifyJSON,
  options: { size?: number; className?: string; color?: string }
): string {
  const { size = 24, className = '', color } = options;
  const iconData = findIcon(name, iconSet);
  if (!iconData) return `<span class="text-red-500">[${name}]</span>`;

  const renderData = iconToSVG(iconData, { width: String(size), height: String(size) });
  const attrs: Record<string, string> = { ...renderData.attributes };
  if (className) attrs.class = className;
  if (color) attrs.style = `color: ${color}`;

  return iconToHTML(replaceIDs(renderData.body), attrs);
}

export function renderIcon(
  iconName: string,
  options: { size?: number; className?: string; color?: string } = {}
): string {
  const { size = 24, className = '', color } = options;

  if (iconName.includes(':')) {
    const [set, name] = iconName.split(':');
    const iconSet = set === 'lucide' ? lucideIcons : iconoirIcons;
    return renderSvg(name, iconSet as IconifyJSON, { size, className, color });
  }

  const iconoirName = iconMap[iconName] || iconName;
  const iconoirData = findIcon(iconoirName, iconoirIcons as IconifyJSON);
  if (iconoirData) {
    return renderSvg(iconoirName, iconoirIcons as IconifyJSON, { size, className, color });
  }

  const lucideName = iconName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
  const lucideData = findIcon(lucideName, lucideIcons as IconifyJSON);
  if (lucideData) {
    return renderSvg(lucideName, lucideIcons as IconifyJSON, { size, className, color });
  }

  return `<span class="text-red-500">[${iconName}]</span>`;
}

export const renderIconSvg = renderIcon;
