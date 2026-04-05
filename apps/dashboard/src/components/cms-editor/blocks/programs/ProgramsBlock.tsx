import { renderDynamicIcon } from '../utils'
import { useThemeClasses } from '../../useThemeClasses'
import { EditableText } from '../editable/EditableText'

export function ProgramsBlock({ content, onChange }: { content: any, onChange?: (content: any) => void }) {
  const { primary, primaryWithOpacity } = useThemeClasses()

  const updateField = (field: string, value: any) => {
    onChange?.({ ...content, [field]: value })
  }

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...(content.items || [])]
    newItems[index] = { ...newItems[index], [field]: value }
    onChange?.({ ...content, items: newItems })
  }

  return (
    <div className="py-20 px-12 bg-white">
      <div className="text-center mb-16">
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
      <div className="grid grid-cols-3 gap-8">
        {content.items?.map((item: any, i: number) => (
          <div key={i} className="bg-slate-50 rounded-2xl p-8 space-y-4">
            {item.icon && (
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: primaryWithOpacity(0.1), color: primary }}>
                {renderDynamicIcon(item.icon, 'h-6 w-6')}
              </div>
            )}
            <h3 className="font-bold text-lg text-slate-900">
              <EditableText value={item.title} onChange={onChange ? (v) => updateItem(i, 'title', v) : undefined} />
            </h3>
            {item.description && <p className="text-sm text-slate-500">
              <EditableText value={item.description} onChange={onChange ? (v) => updateItem(i, 'description', v) : undefined} />
            </p>}
            {item.list && item.list.length > 0 && (
              <ul className="space-y-2 pt-2">
                {item.list.map((listItem: string, j: number) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-0.5" style={{ color: primary }}>✓</span>
                    <span>{listItem}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      {content.cta && content.cta.label && (
        <div className="text-center mt-12">
          <a
            href={content.cta.href || '#'}
            className="inline-flex items-center gap-2 px-8 py-3 text-white font-semibold rounded-full transition-colors"
            style={{ backgroundColor: primary }}
          >
            {content.cta.label}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      )}
    </div>
  )
}
