export interface IconEntry {
  name: string
  label: string
  icon: string
}

export const SOCIAL_ICONS: IconEntry[] = [
  { name: 'github', label: 'GitHub', icon: 'github' },
  { name: 'twitter', label: 'Twitter', icon: 'twitter' },
  { name: 'x', label: 'X', icon: 'x' },
  { name: 'facebook', label: 'Facebook', icon: 'facebook' },
  { name: 'instagram', label: 'Instagram', icon: 'instagram' },
  { name: 'linkedin', label: 'LinkedIn', icon: 'linkedin' },
  { name: 'youtube', label: 'YouTube', icon: 'youtube' },
  { name: 'tiktok', label: 'TikTok', icon: 'tiktok' },
  { name: 'whatsapp', label: 'WhatsApp', icon: 'whatsapp' },
  { name: 'discord', label: 'Discord', icon: 'discord' },
  { name: 'telegram', label: 'Telegram', icon: 'telegram' },
  { name: 'peerlist', label: 'Reddit', icon: 'peerlist' },
  { name: 'pinterest', label: 'Pinterest', icon: 'pinterest' },
  { name: 'snapchat', label: 'Snapchat', icon: 'snapchat' },
  { name: 'threads', label: 'Threads', icon: 'threads' },
  { name: 'asana', label: 'Twitch', icon: 'asana' },
  { name: 'spotify', label: 'Spotify', icon: 'spotify' },
]

export const UI_ICONS: IconEntry[] = [
  // School & Education
  { name: 'graduation-cap', label: 'Graduation', icon: 'graduation-cap' },
  { name: 'book', label: 'Book', icon: 'book' },
  { name: 'book-solid', label: 'Book Solid', icon: 'book-solid' },
  { name: 'book-stack', label: 'Book Stack', icon: 'book-stack' },
  { name: 'bookmark', label: 'Bookmark', icon: 'bookmark' },
  { name: 'math-book', label: 'Math', icon: 'math-book' },
  { name: 'atom', label: 'Science', icon: 'atom' },
  { name: 'ruler', label: 'Ruler', icon: 'ruler' },
  { name: 'calculator', label: 'Calculator', icon: 'calculator' },
  { name: 'test-tube', label: 'Lab', icon: 'test-tube' },
  { name: 'flask', label: 'Flask', icon: 'flask' },
  { name: 'learning', label: 'Learning', icon: 'learning' },
  { name: 'building', label: 'School', icon: 'building' },

  // Navigation & Arrows
  { name: 'arrow-right', label: 'Arrow Right', icon: 'arrow-right' },
  { name: 'arrow-left', label: 'Arrow Left', icon: 'arrow-left' },
  { name: 'arrow-up', label: 'Arrow Up', icon: 'arrow-up' },
  { name: 'arrow-down', label: 'Arrow Down', icon: 'arrow-down' },
  { name: 'nav-arrow-down-solid', label: 'Down', icon: 'nav-arrow-down-solid' },
  { name: 'nav-arrow-up-solid', label: 'Up', icon: 'nav-arrow-up-solid' },
  { name: 'nav-arrow-right-solid', label: 'Right', icon: 'nav-arrow-right-solid' },
  { name: 'nav-arrow-left-solid', label: 'Left', icon: 'nav-arrow-left-solid' },

  // Actions
  { name: 'plus', label: 'Plus', icon: 'plus' },
  { name: 'plus-circle-solid', label: 'Plus Circle', icon: 'plus-circle-solid' },
  { name: 'minus', label: 'Minus', icon: 'minus' },
  { name: 'check', label: 'Check', icon: 'check' },
  { name: 'xmark', label: 'Close', icon: 'xmark' },
  { name: 'edit', label: 'Edit', icon: 'edit' },
  { name: 'design-pencil', label: 'Design Pen', icon: 'design-pencil' },
  { name: 'trash', label: 'Delete', icon: 'trash' },
  { name: 'copy', label: 'Copy', icon: 'copy' },
  { name: 'link', label: 'Link', icon: 'link' },
  { name: 'upload', label: 'Upload', icon: 'upload' },
  { name: 'download', label: 'Download', icon: 'download' },
  { name: 'refresh', label: 'Refresh', icon: 'refresh' },
  { name: 'undo', label: 'Undo', icon: 'undo' },
  { name: 'redo', label: 'Redo', icon: 'redo' },
  { name: 'search', label: 'Search', icon: 'search' },
  { name: 'filter', label: 'Filter', icon: 'filter' },
  { name: 'menu', label: 'Menu', icon: 'menu' },

  // Status
  { name: 'check-circle-solid', label: 'Check Circle', icon: 'check-circle-solid' },
  { name: 'warning-circle-solid', label: 'Warning', icon: 'warning-circle-solid' },
  { name: 'warning-triangle-solid', label: 'Alert', icon: 'warning-triangle-solid' },
  { name: 'info-circle-solid', label: 'Info', icon: 'info-circle-solid' },
  { name: 'help-circle-solid', label: 'Help', icon: 'help-circle-solid' },

  // Communication
  { name: 'mail', label: 'Mail', icon: 'mail' },
  { name: 'phone', label: 'Phone', icon: 'phone' },
  { name: 'map-pin', label: 'Location', icon: 'map-pin' },
  { name: 'map', label: 'Map', icon: 'map' },
  { name: 'chat-bubble', label: 'Comment', icon: 'chat-bubble' },
  { name: 'chat-bubble-solid', label: 'Chat', icon: 'chat-bubble-solid' },
  { name: 'megaphone', label: 'Megaphone', icon: 'megaphone' },
  { name: 'bell', label: 'Bell', icon: 'bell' },
  { name: 'bell-notification-solid', label: 'Bell Notify', icon: 'bell-notification-solid' },

  // Users
  { name: 'user', label: 'User', icon: 'user' },
  { name: 'user-badge-check', label: 'User Verified', icon: 'user-badge-check' },

  // Media & Files
  { name: 'media-image', label: 'Image', icon: 'media-image' },
  { name: 'camera', label: 'Camera', icon: 'camera' },
  { name: 'play-solid', label: 'Play', icon: 'play-solid' },
  { name: 'folder', label: 'Folder', icon: 'folder' },
  { name: 'folder-minus', label: 'Folder Remove', icon: 'folder-minus' },
  { name: 'folder-plus', label: 'Folder Add', icon: 'folder-plus' },

  // Time & Calendar
  { name: 'calendar', label: 'Calendar', icon: 'calendar' },
  { name: 'clock', label: 'Clock', icon: 'clock' },
  { name: 'alarm', label: 'Alarm', icon: 'alarm' },
  { name: 'timer', label: 'Timer', icon: 'timer' },

  // Commerce
  { name: 'bank', label: 'Bank', icon: 'bank' },
  { name: 'dollar', label: 'Dollar', icon: 'dollar' },
  { name: 'dollar-circle-solid', label: 'Dollar Circle', icon: 'dollar-circle-solid' },
  { name: 'cart', label: 'Cart', icon: 'cart' },
  { name: 'shop', label: 'Store', icon: 'shop' },
  { name: 'wallet', label: 'Wallet', icon: 'wallet' },

  // Tools & Settings
  { name: 'settings', label: 'Settings', icon: 'settings' },
  { name: 'globe', label: 'Globe', icon: 'globe' },
  { name: 'lock', label: 'Lock', icon: 'lock' },
  { name: 'key', label: 'Key', icon: 'key' },
  { name: 'shield', label: 'Shield', icon: 'shield' },
  { name: 'shield-check', label: 'Shield Check', icon: 'shield-check' },
  { name: 'wrench', label: 'Wrench', icon: 'wrench' },
  { name: 'hammer', label: 'Hammer', icon: 'hammer' },
  { name: 'palette', label: 'Art', icon: 'palette' },
  { name: 'light-bulb', label: 'Idea', icon: 'light-bulb' },

  // Devices
  { name: 'code', label: 'Code', icon: 'code' },
  { name: 'terminal', label: 'Terminal', icon: 'terminal' },
  { name: 'cpu', label: 'CPU', icon: 'cpu' },
  { name: 'database', label: 'Database', icon: 'database' },
  { name: 'server', label: 'Server', icon: 'server' },
  { name: 'wifi', label: 'WiFi', icon: 'wifi' },
  { name: 'bluetooth', label: 'Bluetooth', icon: 'bluetooth' },

  // Misc
  { name: 'home', label: 'Home', icon: 'home' },
  { name: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { name: 'box', label: 'Box', icon: 'box' },
  { name: 'package', label: 'Package', icon: 'package' },
  { name: 'eye', label: 'Eye', icon: 'eye' },
  { name: 'eye-solid', label: 'Eye Solid', icon: 'eye-solid' },
  { name: 'star', label: 'Star', icon: 'star' },
  { name: 'heart', label: 'Heart', icon: 'heart' },
  { name: 'heart-solid', label: 'Heart Solid', icon: 'heart-solid' },
  { name: 'white-flag-solid', label: 'Flag', icon: 'white-flag-solid' },
  { name: 'trophy', label: 'Trophy', icon: 'trophy' },
  { name: 'medal', label: 'Medal', icon: 'medal' },
  { name: 'crown', label: 'Crown', icon: 'crown' },
  { name: 'rocket', label: 'Rocket', icon: 'rocket' },
  { name: 'flash', label: 'Lightning', icon: 'flash' },
  { name: 'fire-flame', label: 'Fire', icon: 'fire-flame' },
  { name: 'spark', label: 'Spark', icon: 'spark' },
  { name: 'gamepad', label: 'Game', icon: 'gamepad' },
  { name: 'puzzle', label: 'Puzzle', icon: 'puzzle' },
  { name: 'square-cursor-solid', label: 'Layers', icon: 'square-cursor-solid' },
  { name: 'book-stack', label: 'Stack', icon: 'book-stack' },

  // Weather & Nature
  { name: 'sun-light', label: 'Sun', icon: 'sun-light' },
  { name: 'moon-sat', label: 'Moon', icon: 'moon-sat' },
  { name: 'cloud', label: 'Cloud', icon: 'cloud' },
  { name: 'umbrella', label: 'Umbrella', icon: 'umbrella' },
  { name: 'droplet', label: 'Drop', icon: 'droplet' },
  { name: 'tree', label: 'Tree', icon: 'tree' },
  { name: 'flower', label: 'Flower', icon: 'flower' },
  { name: 'leaf', label: 'Leaf', icon: 'leaf' },

  // Transport
  { name: 'car', label: 'Car', icon: 'car' },
  { name: 'bus', label: 'Bus', icon: 'bus' },
  { name: 'bicycle', label: 'Bicycle', icon: 'bicycle' },
  { name: 'train', label: 'Train', icon: 'train' },
  { name: 'tram', label: 'Tram', icon: 'tram' },
  { name: 'airplane', label: 'Airplane', icon: 'airplane' },

  // Media
  { name: 'music-note', label: 'Music', icon: 'music-note' },
  { name: 'headset', label: 'Headset', icon: 'headset' },
  { name: 'microphone', label: 'Mic', icon: 'microphone' },

  // Display
  { name: 'printer', label: 'Printer', icon: 'printer' },
  { name: 'expand', label: 'Expand', icon: 'expand' },
  { name: 'compress', label: 'Collapse', icon: 'compress' },

  // Share
  { name: 'share-android-solid', label: 'Share', icon: 'share-android-solid' },
]

export const BADGE_ICONS: IconEntry[] = [
  // Achievements
  { name: 'badge-check', label: 'Seal', icon: 'badge-check' },
  { name: 'shield-check', label: 'Shield Check', icon: 'shield-check' },
  { name: 'crown', label: 'Crown', icon: 'crown' },
  { name: 'trophy', label: 'Trophy', icon: 'trophy' },
  { name: 'medal', label: 'Medal', icon: 'medal' },
  { name: 'star', label: 'Star', icon: 'star' },

  // Rating & Reactions
  { name: 'thumbs-up', label: 'Like', icon: 'thumbs-up' },
  { name: 'thumbs-down', label: 'Dislike', icon: 'thumbs-down' },
  { name: 'heart', label: 'Heart', icon: 'heart' },
  { name: 'heart-solid', label: 'Heart Solid', icon: 'heart-solid' },

  // Tech & Code
  { name: 'code', label: 'Code', icon: 'code' },
  { name: 'terminal', label: 'Terminal', icon: 'terminal' },
  { name: 'git', label: 'Git', icon: 'git' },
  { name: 'github', label: 'GitHub', icon: 'github' },
  { name: 'hashtag', label: 'Hash', icon: 'hashtag' },
  { name: 'cursor-pointer', label: 'Cursor', icon: 'cursor-pointer' },

  // Charts
  { name: 'candlestick-chart', label: 'Chart', icon: 'candlestick-chart' },

  // Fitness & Health
  { name: 'activity', label: 'Heartbeat', icon: 'activity' },
  { name: 'gym', label: 'Gym', icon: 'gym' },
  { name: 'running', label: 'Running', icon: 'running' },
  { name: 'walking', label: 'Walking', icon: 'walking' },
  { name: 'swimming', label: 'Swimming', icon: 'swimming' },
  { name: 'yoga', label: 'Yoga', icon: 'yoga' },
  { name: 'basketball', label: 'Basketball', icon: 'basketball' },
  { name: 'football', label: 'Football', icon: 'football' },
  { name: 'healthcare', label: 'Health', icon: 'healthcare' },
  { name: 'pillow', label: 'Medicine', icon: 'pillow' },

  // Food & Drink
  { name: 'coffee-cup', label: 'Coffee', icon: 'coffee-cup' },
  { name: 'organic-food', label: 'Food', icon: 'organic-food' },

  // Brands
  { name: 'apple', label: 'Apple', icon: 'apple' },
  { name: 'windows', label: 'Windows', icon: 'windows' },
  { name: 'share-android-solid', label: 'Android', icon: 'share-android-solid' },
  { name: 'spotify', label: 'Spotify', icon: 'spotify' },
  { name: 'facebook', label: 'Facebook', icon: 'facebook' },
  { name: 'twitter', label: 'Twitter', icon: 'twitter' },
  { name: 'instagram', label: 'Instagram', icon: 'instagram' },
  { name: 'youtube', label: 'YouTube', icon: 'youtube' },

  // Actions
  { name: 'rocket', label: 'Rocket', icon: 'rocket' },
  { name: 'flash', label: 'Lightning', icon: 'flash' },
  { name: 'compass', label: 'Target', icon: 'compass' },
  { name: 'fire-flame', label: 'Fire', icon: 'fire-flame' },
  { name: 'spark', label: 'Spark', icon: 'spark' },
]
