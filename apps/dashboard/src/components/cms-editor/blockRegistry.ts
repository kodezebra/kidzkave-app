import { 
  Box, Layout, Flag, Zap, Eye, BarChart3, Users, MessageSquare, Megaphone,
  ListFilter, HeartHandshake, ImagePlay, CircleHelp, Type, Image as ImageIcon,
  MessageCircle, Map as MapIcon, Banknote, GraduationCap
} from 'lucide-react'

import { HeroBlock } from './blocks/hero/HeroBlock'
import { FeaturesBlock } from './blocks/features/FeaturesBlock'
import { ContentBlock } from './blocks/content/ContentBlock'
import { StatsBlock } from './blocks/stats/StatsBlock'
import { TeamBlock } from './blocks/team/TeamBlock'
import { TestimonialsBlock } from './blocks/testimonials/TestimonialsBlock'
import { TextBlock } from './blocks/text/TextBlock'
import { CtaBlock } from './blocks/cta/CtaBlock'
import { StepsBlock } from './blocks/steps/StepsBlock'
import { ValuesBlock } from './blocks/values/ValuesBlock'
import { SplitContentBlock } from './blocks/split-content/SplitContentBlock'
import { VideoGalleryBlock } from './blocks/video-gallery/VideoGalleryBlock'
import { FaqBlock } from './blocks/faq/FaqBlock'
import { PricingBlock } from './blocks/pricing/PricingBlock'
import { GalleryBlock } from './blocks/gallery/GalleryBlock'
import { ServicesBlock } from './blocks/services/ServicesBlock'
import { ContactFormBlock } from './blocks/contact-form/ContactFormBlock'
import { MapBlock } from './blocks/map/MapBlock'
import { BannerBlock } from './blocks/banner/BannerBlock'
import { FeesBlock } from './blocks/fees/FeesBlock'
import { ProgramsBlock } from './blocks/programs/ProgramsBlock'

import { HeroInspector } from './blocks/hero/HeroInspector'
import { FeaturesInspector } from './blocks/features/FeaturesInspector'
import { ContentInspector } from './blocks/content/ContentInspector'
import { StatsInspector } from './blocks/stats/StatsInspector'
import { TeamInspector } from './blocks/team/TeamInspector'
import { TestimonialsInspector } from './blocks/testimonials/TestimonialsInspector'
import { TextInspector } from './blocks/text/TextInspector'
import { CtaInspector } from './blocks/cta/CtaInspector'
import { StepsInspector } from './blocks/steps/StepsInspector'
import { ValuesInspector } from './blocks/values/ValuesInspector'
import { SplitContentInspector } from './blocks/split-content/SplitContentInspector'
import { VideoGalleryInspector } from './blocks/video-gallery/VideoGalleryInspector'
import { FaqInspector } from './blocks/faq/FaqInspector'
import { PricingInspector } from './blocks/pricing/PricingInspector'
import { GalleryInspector } from './blocks/gallery/GalleryInspector'
import { ServicesInspector } from './blocks/services/ServicesInspector'
import { ContactFormInspector } from './blocks/contact-form/ContactFormInspector'
import { MapInspector } from './blocks/map/MapInspector'
import { BannerInspector } from './blocks/banner/BannerInspector'
import { FeesInspector } from './blocks/fees/FeesInspector'
import { ProgramsInspector } from './blocks/programs/ProgramsInspector'

export interface BlockDefinition {
  type: string
  label: string
  category: string
  preview?: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  color: string
  defaultContent: object
  Canvas: React.ComponentType<{ content: any; onChange?: (content: any) => void; onSelectCta?: (ctaType: string) => void }>
  Inspector: React.ComponentType<any>
}

export const blockRegistry: Record<string, BlockDefinition> = {
  hero: {
    type: 'hero',
    label: 'Hero Section',
    category: 'layout',
    preview: 'placeholder',
    icon: Box,
    description: 'Headline, subheadline, and background',
    color: 'from-purple-500 to-pink-500',
    defaultContent: {
      title: 'Design Your Future with Precision',
      subtitle: 'Elevate your digital presence with our modern, professional solutions.',
      primaryCta: { label: 'Start Building' },
      secondaryCta: { label: 'View Portfolio' }
    },
    Canvas: HeroBlock,
    Inspector: HeroInspector
  },
  features: {
    type: 'features',
    label: 'Features Grid',
    category: 'content',
    preview: 'placeholder',
    icon: Zap,
    description: 'Highlight your services or features',
    color: 'from-amber-500 to-orange-500',
    defaultContent: {
      tagline: 'Expertise',
      title: 'Tailored Solutions',
      subtitle: 'High-quality services for digital-first businesses.',
      items: [
        { icon: 'zap', title: 'Strategy', text: 'Data-driven strategies.' },
        { icon: 'palette', title: 'Design', text: 'User-centric designs.' },
        { icon: 'code', title: 'Web', text: 'Scalable applications.' }
      ]
    },
    Canvas: FeaturesBlock,
    Inspector: FeaturesInspector
  },
  content: {
    type: 'content',
    label: 'Content Block',
    category: 'content',
    preview: 'placeholder',
    icon: Eye,
    description: 'Text and image layout',
    color: 'from-emerald-500 to-teal-500',
    defaultContent: {
      title: 'About Our Vision',
      text1: 'Innovation at the core.',
      text2: 'We build partnerships.',
      features: ['10+ Years Excellence', 'Global Network'],
      cta: { label: 'Learn More', href: '#' }
    },
    Canvas: ContentBlock,
    Inspector: ContentInspector
  },
  stats: {
    type: 'stats',
    label: 'Stats Section',
    category: 'content',
    preview: 'placeholder',
    icon: BarChart3,
    description: 'Numbers and milestones',
    color: 'from-rose-500 to-red-500',
    defaultContent: {
      items: [
        { value: '500+', label: 'Clients' },
        { value: '12M+', label: 'Users' },
        { value: '45', label: 'Countries' },
        { value: '99.9%', label: 'Uptime' }
      ]
    },
    Canvas: StatsBlock,
    Inspector: StatsInspector
  },
  team: {
    type: 'team',
    label: 'Team Section',
    category: 'content',
    preview: 'placeholder',
    icon: Users,
    description: 'Showcase your team members',
    color: 'from-violet-500 to-purple-500',
    defaultContent: {
      tagline: 'Our Team',
      title: 'Meet the Minds',
      subtitle: 'Dedicated to excellence.',
      members: [{ name: 'Alex Rivera', role: 'CEO', image: '' }]
    },
    Canvas: TeamBlock,
    Inspector: TeamInspector
  },
  testimonials: {
    type: 'testimonials',
    label: 'Testimonials',
    category: 'content',
    preview: 'placeholder',
    icon: MessageSquare,
    description: 'What clients are saying',
    color: 'from-fuchsia-500 to-pink-500',
    defaultContent: {
      tagline: 'Testimonials',
      title: 'What They Say',
      items: [{ name: 'Michael Ross', role: 'Founder', text: 'Remarkable partner.', image: '' }]
    },
    Canvas: TestimonialsBlock,
    Inspector: TestimonialsInspector
  },
  cta: {
    type: 'cta',
    label: 'Call to Action',
    category: 'interactive',
    preview: 'placeholder',
    icon: Megaphone,
    description: 'Urge users to take action',
    color: 'from-orange-500 to-amber-500',
    defaultContent: {
      title: 'Ready to Get Started?',
      subtitle: 'Join our community and start your journey today.',
      eyebrow: 'Limited Spots Available',
      eyebrowStyle: 'badge',
      eyebrowIcon: 'star',
      ctaLabel: 'Apply Now',
      ctaHref: '/admissions',
      secondaryInfo: []
    },
    Canvas: CtaBlock,
    Inspector: CtaInspector
  },
  steps: {
    type: 'steps',
    label: 'Steps/Process',
    category: 'content',
    preview: 'placeholder',
    icon: ListFilter,
    description: 'Numbered steps or process flow',
    color: 'from-cyan-500 to-blue-500',
    defaultContent: {
      tagline: 'How It Works',
      title: 'Our Process',
      subtitle: 'Simple steps to get started.',
      items: [
        { icon: 'zap', title: 'Step 1', description: 'First step description.' },
        { icon: 'settings', title: 'Step 2', description: 'Second step description.' }
      ]
    },
    Canvas: StepsBlock,
    Inspector: StepsInspector
  },
  values: {
    type: 'values',
    label: 'Values Grid',
    category: 'content',
    preview: 'placeholder',
    icon: HeartHandshake,
    description: 'Company values with icons',
    color: 'from-green-500 to-emerald-500',
    defaultContent: {
      tagline: 'Our Values',
      title: 'What We Believe',
      subtitle: 'Core principles guiding us.',
      items: [
        { icon: 'heart', title: 'Integrity', description: 'We do the right thing.' },
        { icon: 'users', title: 'Teamwork', description: 'Together we achieve more.' }
      ]
    },
    Canvas: ValuesBlock,
    Inspector: ValuesInspector
  },
  splitContent: {
    type: 'splitContent',
    label: 'Split Content',
    category: 'layout',
    preview: 'placeholder',
    icon: Layout,
    description: 'Image and text side-by-side',
    color: 'from-indigo-500 to-blue-500',
    defaultContent: {
      eyebrow: 'Since 2024',
      title: 'About Our Vision',
      description: 'We believe in innovation.',
      image: '',
      cta: { label: 'Learn More', href: '#' },
      imagePosition: 'left'
    },
    Canvas: SplitContentBlock,
    Inspector: SplitContentInspector
  },
  videoGallery: {
    type: 'videoGallery',
    label: 'Video Gallery',
    category: 'media',
    preview: 'placeholder',
    icon: ImagePlay,
    description: 'Grid of video thumbnails',
    color: 'from-red-500 to-rose-500',
    defaultContent: {
      tagline: 'Portfolio',
      title: 'Video Showcase',
      subtitle: 'See our work in action.',
      items: [{ title: 'Project Demo', thumbnail: '', videoUrl: '' }]
    },
    Canvas: VideoGalleryBlock,
    Inspector: VideoGalleryInspector
  },
  faq: {
    type: 'faq',
    label: 'FAQ',
    category: 'content',
    preview: 'placeholder',
    icon: CircleHelp,
    description: 'Accordion questions and answers',
    color: 'from-indigo-500 to-violet-500',
    defaultContent: {
      tagline: 'FAQ',
      title: 'Common Questions',
      subtitle: 'Find answers here.',
      items: [{ question: 'How do I get started?', answer: 'Contact us to begin.' }]
    },
    Canvas: FaqBlock,
    Inspector: FaqInspector
  },
  text: {
    type: 'text',
    label: 'Basic Text',
    category: 'content',
    preview: 'placeholder',
    icon: Type,
    description: 'Simple text block',
    color: 'from-gray-500 to-slate-500',
    defaultContent: {
      text: 'New content block.'
    },
    Canvas: TextBlock,
    Inspector: TextInspector
  },
  pricing: {
    type: 'pricing',
    label: 'Pricing Table',
    category: 'content',
    preview: 'placeholder',
    icon: Banknote,
    description: 'Pricing tiers and plans',
    color: 'from-emerald-500 to-teal-500',
    defaultContent: {
      tagline: 'Pricing',
      title: 'Simple Pricing',
      tiers: [{ name: 'Basic', price: '9', period: 'month', features: ['Feature 1'], ctaLabel: 'Get Started', ctaHref: '#', recommended: false }]
    },
    Canvas: PricingBlock,
    Inspector: PricingInspector
  },
  gallery: {
    type: 'gallery',
    label: 'Image Gallery',
    category: 'media',
    preview: 'placeholder',
    icon: ImageIcon,
    description: 'Image grid gallery',
    color: 'from-pink-500 to-rose-500',
    defaultContent: {
      tagline: 'Gallery',
      title: 'Our Work',
      layout: 'grid',
      images: [{ src: '/image1.jpg', alt: 'Image 1' }]
    },
    Canvas: GalleryBlock,
    Inspector: GalleryInspector
  },
  services: {
    type: 'services',
    label: 'Services List',
    category: 'content',
    preview: 'placeholder',
    icon: Zap,
    description: 'Services with icons',
    color: 'from-blue-500 to-cyan-500',
    defaultContent: {
      tagline: 'Services',
      title: 'What We Offer',
      layout: 'grid',
      items: [{ icon: 'zap', title: 'Service 1', description: 'Description 1' }]
    },
    Canvas: ServicesBlock,
    Inspector: ServicesInspector
  },
  'contact-form': {
    type: 'contact-form',
    label: 'Contact Form',
    category: 'interactive',
    preview: 'placeholder',
    icon: MessageCircle,
    description: 'Add a contact form with custom fields',
    color: 'from-green-500 to-emerald-500',
    defaultContent: {
      tagline: 'Contact',
      title: 'Get In Touch',
      submitLabel: 'Send Message',
      fields: [{ name: 'name', label: 'Name', type: 'text', required: true }]
    },
    Canvas: ContactFormBlock,
    Inspector: ContactFormInspector
  },
  map: {
    type: 'map',
    label: 'Map Block',
    category: 'media',
    preview: 'placeholder',
    icon: MapIcon,
    description: 'Embed a Google Map with location',
    color: 'from-teal-500 to-cyan-500',
    defaultContent: {
      title: 'Visit Our Campus',
      height: 'medium',
      showDirections: true,
      directionsLabel: 'Get Directions'
    },
    Canvas: MapBlock,
    Inspector: MapInspector
  },
  banner: {
    type: 'banner',
    label: 'Page Banner',
    category: 'layout',
    preview: 'placeholder',
    icon: Flag,
    description: 'Simple header for inner pages',
    color: 'from-blue-500 to-cyan-500',
    defaultContent: {
      title: 'Page Title',
      height: 'small',
      showBreadcrumb: true
    },
    Canvas: BannerBlock,
    Inspector: BannerInspector
  },
  fees: {
    type: 'fees',
    label: 'Fees Table',
    category: 'content',
    preview: 'placeholder',
    icon: Banknote,
    description: 'School fees, charges, and pricing',
    color: 'from-emerald-500 to-teal-500',
    defaultContent: {
      tagline: 'Fees',
      title: 'Fee Structure',
      currency: '$',
      sections: []
    },
    Canvas: FeesBlock,
    Inspector: FeesInspector
  },
  programs: {
    type: 'programs',
    label: 'Programs List',
    category: 'content',
    preview: 'placeholder',
    icon: GraduationCap,
    description: 'Programs with checklist items',
    color: 'from-amber-500 to-yellow-500',
    defaultContent: {
      tagline: 'Programs',
      title: 'Our Learning Programs',
      subtitle: 'Age-appropriate curriculum designed for holistic development.',
      items: [
        { icon: 'graduation-cap', title: 'Play Group', description: 'Early childhood development through play.', list: ['Age 18 months - 2 years', 'Child-centered curriculum', 'Motor skill development'] },
        { icon: 'book', title: 'Nursery', description: 'Building foundations for learning.', list: ['Age 3-4 years', 'Phonics & numeracy', 'Creative arts & crafts'] }
      ]
    },
    Canvas: ProgramsBlock,
    Inspector: ProgramsInspector
  }
}

export function getCanvasComponent(type: string) {
  return blockRegistry[type]?.Canvas || null
}

export function getInspectorComponent(type: string) {
  return blockRegistry[type]?.Inspector || null
}

export function getBlockDefinition(type: string) {
  return blockRegistry[type] || null
}

export function getAllBlocks() {
  return Object.values(blockRegistry)
}