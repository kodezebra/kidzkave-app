import { renderDynamicIcon } from '../utils'
import { useThemeClasses } from '../../useThemeClasses'
import { EditableText } from '../editable/EditableText'

// Features section grid for the editor canvas
export function FeaturesBlock({ content, onChange }: { content: any; onChange?: (content: any) => void }) {
  const { primary, primaryWithOpacity } = useThemeClasses()

  const updateField = (field: string, value: string) => {
    if (onChange) {
      onChange({ ...content, [field]: value })
    }
  }

  const updateItem = (index: number, field: string, value: string) => {
    if (onChange) {
      const newItems = [...(content.items || [])]
      newItems[index] = { ...newItems[index], [field]: value }
      onChange({ ...content, items: newItems })
    }
  }

  return (
    <div className="py-16 px-12">
      <div className="text-center mb-16">
        <div className="font-bold text-xs uppercase tracking-widest mb-2" style={{ color: primary }}>
          <EditableText value={content.tagline} onChange={onChange ? (v) => updateField('tagline', v) : undefined} />
        </div>
        <h2 className="text-4xl font-black text-slate-900">
          <EditableText value={content.title} onChange={onChange ? (v) => updateField('title', v) : undefined} />
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {content.items?.map((item: any, i: number) => (
          <div key={i} className="p-8 rounded-3xl border bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: primaryWithOpacity(0.1), color: primary }}>
              {renderDynamicIcon(item.icon || 'zap', 'h-6 w-6')}
            </div>
            <h3 className="font-bold text-lg mb-2">
              <EditableText value={item.title} onChange={onChange ? (v) => updateItem(i, 'title', v) : undefined} />
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              <EditableText value={item.text} onChange={onChange ? (v) => updateItem(i, 'text', v) : undefined} />
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
