import { renderDynamicIcon } from '../utils'
import { useThemeClasses } from '../../useThemeClasses'
import { EditableText } from '../editable/EditableText'

export function ServicesBlock({ content, onChange }: { content: any; onChange?: (content: any) => void }) {
  const { primary, primaryWithOpacity } = useThemeClasses()
  const layout = content.layout || 'grid'

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
    <div className="py-16 px-12 bg-slate-50">
      <div className="text-center mb-12">
        <div className="font-bold text-xs uppercase tracking-widest mb-2" style={{ color: primary }}>
          <EditableText value={content.tagline} onChange={onChange ? (v) => updateField('tagline', v) : undefined} />
        </div>
        <h2 className="text-4xl font-black text-slate-900">
          <EditableText value={content.title} onChange={onChange ? (v) => updateField('title', v) : undefined} />
        </h2>
        {content.subtitle && (
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            <EditableText value={content.subtitle} onChange={onChange ? (v) => updateField('subtitle', v) : undefined} />
          </p>
        )}
      </div>
      {layout === 'list' ? (
        <div className="space-y-4">
          {content.items?.map((item: any, i: number) => (
            <div key={i} className="flex gap-4 p-6 rounded-xl bg-white border">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: primaryWithOpacity(0.1), color: primary }}>
                {renderDynamicIcon(item.icon || 'zap', 'h-6 w-6')}
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  <EditableText value={item.title} onChange={onChange ? (v) => updateItem(i, 'title', v) : undefined} />
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  <EditableText value={item.description} onChange={onChange ? (v) => updateItem(i, 'description', v) : undefined} />
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {content.items?.map((item: any, i: number) => (
            <div key={i} className="p-6 rounded-xl bg-white border transition-colors" style={{ borderColor: primaryWithOpacity(0.5) }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: primaryWithOpacity(0.1), color: primary }}>
                {renderDynamicIcon(item.icon || 'zap', 'h-6 w-6')}
              </div>
              <h3 className="font-bold text-base">
                <EditableText value={item.title} onChange={onChange ? (v) => updateItem(i, 'title', v) : undefined} />
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                <EditableText value={item.description} onChange={onChange ? (v) => updateItem(i, 'description', v) : undefined} />
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
