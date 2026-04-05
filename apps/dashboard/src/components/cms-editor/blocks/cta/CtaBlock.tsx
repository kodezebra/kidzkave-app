import { renderDynamicIcon } from '../utils'
import { useThemeClasses } from '../../useThemeClasses'
import { EditableText } from '../editable/EditableText'

export function CtaBlock({ content, onChange, onSelectCta }: { content: any; onChange?: (content: any) => void; onSelectCta?: (ctaType: string) => void }) {
  const { primary, accent, primaryWithOpacity } = useThemeClasses()

  const updateField = (field: string, value: string) => {
    if (onChange) {
      onChange({ ...content, [field]: value })
    }
  }

  const getEyebrowStyle = (style: string | undefined, text: string) => {
    switch (style) {
      case 'badge':
        return <span className="inline-block bg-white/15 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20 shadow-sm">
          <EditableText value={text} onChange={onChange ? (v) => updateField('eyebrow', v) : undefined} />
        </span>
      case 'minimal':
        return <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-white/80 mb-6">
          <EditableText value={text} onChange={onChange ? (v) => updateField('eyebrow', v) : undefined} />
        </span>
      case 'icon':
        return (
          <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md text-white px-5 py-2 rounded-full mb-6 border border-white/20 shadow-sm">
            <span className="text-lg">{renderDynamicIcon(content.eyebrowIcon || 'star', 'h-5 w-5')}</span>
            <span className="text-sm font-semibold uppercase tracking-wider">
              <EditableText value={text} onChange={onChange ? (v) => updateField('eyebrow', v) : undefined} />
            </span>
          </div>
        )
      default:
        return text ? <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-white/70 mb-6">
          <EditableText value={text} onChange={onChange ? (v) => updateField('eyebrow', v) : undefined} />
        </span> : null
    }
  }

  return (
    <div className="py-20 px-12 text-center text-white mx-8 rounded-[3rem] shadow-2xl relative overflow-hidden" style={{ backgroundColor: primary }}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom right, ${primaryWithOpacity(0.8)}, ${primary})` }}></div>
      <div className="relative z-10 space-y-6">
        {content.eyebrow && getEyebrowStyle(content.eyebrowStyle, content.eyebrow)}
        <h2 className="text-4xl font-black">
          <EditableText value={content.title} onChange={onChange ? (v) => updateField('title', v) : undefined} />
        </h2>
        <p className="text-white/80 max-w-xl mx-auto">
          <EditableText value={content.subtitle} onChange={onChange ? (v) => updateField('subtitle', v) : undefined} />
        </p>
        <button 
          className="text-white px-8 py-4 rounded-2xl font-bold inline-block shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
          style={{ backgroundColor: accent, boxShadow: `0 10px 15px -3px ${accent}33` }}
          onClick={() => onSelectCta?.('cta')}
        >
          <EditableText value={content.ctaLabel} onChange={onChange ? (v) => updateField('ctaLabel', v) : undefined} />
        </button>
        {content.secondaryInfo && content.secondaryInfo.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm mt-8">
            {content.secondaryInfo.map((item: any, index: number) => (
              <span key={index} className="flex items-center gap-3">
                {index > 0 && <span className="opacity-50">•</span>}
                {item.href ? (
                  <a href={item.href} className="hover:text-white transition-colors underline underline-offset-2">
                    {item.label}
                  </a>
                ) : (
                  <span>{item.label}</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
