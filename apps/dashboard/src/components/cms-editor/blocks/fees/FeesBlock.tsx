import { Icon } from '@iconify/react'
import { useThemeClasses } from '../../useThemeClasses'
import { EditableText } from '../editable/EditableText'

export function FeesBlock({ content, onChange }: { content: any, onChange?: (content: any) => void }) {
  const { primary } = useThemeClasses()
  const currency = content.currency || 'UGX'
  const sections = content.sections || []

  const updateField = (field: string, value: any) => {
    onChange?.({ ...content, [field]: value })
  }

  const updateSection = (index: number, field: string, value: any) => {
    const newSections = [...sections]
    newSections[index] = { ...newSections[index], [field]: value }
    onChange?.({ ...content, sections: newSections })
  }

  return (
    <div className="py-20 px-12 bg-slate-50">
      <div className="text-center mb-16">
        <div className="font-bold text-xs uppercase tracking-widest mb-2" style={{ color: primary }}>
          <EditableText value={content.tagline} onChange={onChange ? (v) => updateField('tagline', v) : undefined} />
        </div>
        <h2 className="text-4xl font-black text-slate-900">
          <EditableText value={content.title || 'School Fees'} onChange={onChange ? (v) => updateField('title', v) : undefined} />
        </h2>
        {content.subtitle && <p className="mt-4 text-slate-600">
          <EditableText value={content.subtitle} onChange={onChange ? (v) => updateField('subtitle', v) : undefined} />
        </p>}
      </div>

      {sections.map((section: any, i: number) => (
        <div key={i} className="mb-12">
          {section.title && <h3 className="text-2xl font-bold text-slate-900 mb-6">
            <EditableText value={section.title} onChange={onChange ? (v) => updateSection(i, 'title', v) : undefined} />
          </h3>}
          
          {section.style === 'checklist' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items?.map((item: any, j: number) => (
                <div key={j} className="flex items-center gap-3 p-4 bg-white rounded-xl border">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon icon="ph:check-bold" className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-slate-700 font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          ) : section.style === 'table' ? (
            <div className="bg-white rounded-2xl border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold text-slate-900">Item</th>
                    <th className="text-right p-4 font-semibold text-slate-900">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {section.items?.map((item: any, j: number) => (
                    <tr key={j} className={j < section.items.length - 1 ? 'border-b' : ''}>
                      <td className="p-4 text-slate-700">{item.name}</td>
                      <td className="p-4 text-right font-semibold" style={{ color: primary }}>{item.price} {currency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {section.items?.map((item: any, j: number) => (
                <div key={j} className="flex items-center justify-between p-4 bg-white rounded-xl border">
                  <span className="text-slate-700 font-medium">{item.name}</span>
                  <span className="font-bold" style={{ color: primary }}>{item.price} {currency}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {content.ctaLabel && content.ctaHref && (
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full" style={{ backgroundColor: primary }}>
            <EditableText value={content.ctaLabel} onChange={onChange ? (v) => updateField('ctaLabel', v) : undefined} />
            <Icon icon="ph:arrow-right" className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}
