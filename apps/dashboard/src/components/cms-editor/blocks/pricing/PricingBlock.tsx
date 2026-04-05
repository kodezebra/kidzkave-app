import { renderDynamicIcon } from '../utils'
import { useThemeClasses } from '../../useThemeClasses'
import { EditableText } from '../editable/EditableText'

export function PricingBlock({ content, onChange }: { content: any, onChange?: (content: any) => void }) {
  const { primary, primaryWithOpacity } = useThemeClasses()

  const updateField = (field: string, value: any) => {
    onChange?.({ ...content, [field]: value })
  }

  const updateTier = (index: number, field: string, value: any) => {
    const newTiers = [...(content.tiers || [])]
    newTiers[index] = { ...newTiers[index], [field]: value }
    onChange?.({ ...content, tiers: newTiers })
  }

  return (
    <div className="py-16 px-12 bg-slate-50">
      <div className="text-center mb-12">
        <div className="font-bold text-xs uppercase tracking-widest mb-2" style={{ color: primary }}>
          <EditableText value={content.tagline} onChange={onChange ? (v) => updateField('tagline', v) : undefined} />
        </div>
        <h2 className="text-4xl font-black text-slate-900">
          <EditableText value={content.title} onChange={onChange ? (v) => updateField('title', v) : undefined} />
        </h2>
        {content.subtitle && <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
          <EditableText value={content.subtitle} onChange={onChange ? (v) => updateField('subtitle', v) : undefined} />
        </p>}
      </div>
      <div className="grid grid-cols-3 gap-6">
        {content.tiers?.map((tier: any, i: number) => (
          <div
            key={i}
            className={`relative rounded-2xl border-2 p-6 ${
              tier.recommended ? 'border-solid bg-white' : 'border-slate-200 bg-white'
            }`}
            style={tier.recommended ? { borderColor: primary, backgroundColor: primaryWithOpacity(0.05) } : {}}
          >
            {tier.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white px-3 py-0.5 rounded-full text-[10px] font-bold uppercase" style={{ backgroundColor: primary }}>
                Popular
              </div>
            )}
            <div className="text-center mb-6">
              <h4 className="font-bold text-lg">
                <EditableText value={tier.name} onChange={onChange ? (v) => updateTier(i, 'name', v) : undefined} />
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                <EditableText value={tier.description} onChange={onChange ? (v) => updateTier(i, 'description', v) : undefined} />
              </p>
              <div className="mt-4 flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black">
                  <EditableText value={tier.price} onChange={onChange ? (v) => updateTier(i, 'price', v) : undefined} />
                </span>
                <span className="text-slate-500 text-xs">/
                  <EditableText value={tier.period} onChange={onChange ? (v) => updateTier(i, 'period', v) : undefined} />
                </span>
              </div>
            </div>
            <ul className="space-y-2 mb-6">
              {tier.features?.map((feature: string, j: number) => (
                <li key={j} className="flex items-start gap-2 text-xs">
                  {renderDynamicIcon('check', 'h-4 w-4 text-green-500 flex-shrink-0 mt-0.5')}
                  <span className="text-slate-600">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: tier.recommended ? primary : '#1e293b' }}>
              <EditableText value={tier.ctaLabel || 'Get Started'} onChange={onChange ? (v) => updateTier(i, 'ctaLabel', v) : undefined} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
