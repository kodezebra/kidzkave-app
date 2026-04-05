import { Icon } from '@iconify/react'
import { useThemeClasses } from '../../useThemeClasses'
import { EditableText } from '../editable/EditableText'

export function TestimonialsBlock({ content, onChange }: { content: any, onChange?: (content: any) => void }) {
  const { accent } = useThemeClasses()

  const updateField = (field: string, value: any) => {
    onChange?.({ ...content, [field]: value })
  }

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...(content.items || [])]
    newItems[index] = { ...newItems[index], [field]: value }
    onChange?.({ ...content, items: newItems })
  }

  return (
    <div className="py-20 px-12 bg-slate-50/50">
      <div className="text-center mb-16">
        <div className="font-bold text-xs uppercase tracking-widest mb-2" style={{ color: accent }}>
          <EditableText value={content.tagline} onChange={onChange ? (v) => updateField('tagline', v) : undefined} />
        </div>
        <h2 className="text-4xl font-black text-slate-900">
          <EditableText value={content.title} onChange={onChange ? (v) => updateField('title', v) : undefined} />
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {content.items?.map((item: any, i: number) => (
          <div key={i} className="p-8 rounded-3xl border bg-white shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-100 overflow-hidden shrink-0">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <Icon icon="ph:chats-fill" className="h-4 w-4" />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs truncate">
                  <EditableText value={item.name} onChange={onChange ? (v) => updateItem(i, 'name', v) : undefined} />
                </div>
                <div className="text-[10px] text-muted-foreground truncate">
                  <EditableText value={item.role} onChange={onChange ? (v) => updateItem(i, 'role', v) : undefined} />
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "
              <EditableText value={item.text} onChange={onChange ? (v) => updateItem(i, 'text', v) : undefined} />
              "
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
