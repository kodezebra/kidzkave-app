// Hero section rendering on the editor canvas
import { useThemeClasses } from '../../useThemeClasses'
import { EditableText } from '../editable/EditableText'
import { Icon } from '@iconify/react'

export function HeroBlock({ content, onChange, onSelectCta }: { content: any; onChange?: (content: any) => void; onSelectCta?: (ctaType: string) => void }) {
  const { primary, primaryWithOpacity, accent } = useThemeClasses()

  const updateField = (field: string, value: any) => {
    if (onChange) {
      onChange({ ...content, [field]: value })
    }
  }

  const updateCta = (ctaKey: string, field: string, value: string) => {
    if (onChange) {
      onChange({
        ...content,
        [ctaKey]: { ...content[ctaKey], [field]: value }
      })
    }
  }

  return (
    <div 
      className="text-center py-20 px-12 space-y-8 relative overflow-hidden mx-8 my-12 rounded-3xl text-white"
      style={content.image ? { 
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('${content.image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      } : { 
        backgroundColor: primary,
        background: `linear-gradient(to bottom right, ${primaryWithOpacity(0.85)}, ${primary})`
      }}
    >
      {!content.image && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl -z-10 opacity-30" style={{ backgroundColor: accent }}></div>
      )}
      
      <div className="relative z-10">
        {content.badge && (
          <div 
            className="mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold tracking-wider uppercase"
            style={content.badgeVariant === 'glass' 
              ? { backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }
              : { backgroundColor: accent, border: 'none' }
            }
          >
            {content.badgeIcon && <Icon icon={`iconoir:${content.badgeIcon}`} className="h-4 w-4" />}
            <EditableText value={content.badge} onChange={onChange ? (v) => updateField('badge', v) : undefined} />
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
          <EditableText value={content.title} onChange={onChange ? (v) => updateField('title', v) : undefined} />
        </h1>
        <p className="text-xl max-w-2xl mx-auto leading-relaxed mt-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
          <EditableText value={content.subtitle} onChange={onChange ? (v) => updateField('subtitle', v) : undefined} />
        </p>
        <div className="flex justify-center gap-4 pt-6">
          <button 
            className="text-white px-8 py-4 rounded-2xl font-bold shadow-xl cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: accent, boxShadow: `0 10px 25px -5px ${accent}50` }}
            onClick={() => onSelectCta?.('primary')}
          >
            <EditableText value={content.primaryCta?.label || 'Click me'} onChange={onChange ? (v) => updateCta('primaryCta', 'label', v) : undefined} />
          </button>
          {content.secondaryCta?.label && (
            <button 
              className="bg-white px-8 py-4 rounded-2xl font-bold shadow-xl cursor-pointer hover:bg-slate-50 transition-colors"
              style={{ color: primary }}
              onClick={() => onSelectCta?.('secondary')}
            >
              <EditableText value={content.secondaryCta?.label} onChange={onChange ? (v) => updateCta('secondaryCta', 'label', v) : undefined} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
