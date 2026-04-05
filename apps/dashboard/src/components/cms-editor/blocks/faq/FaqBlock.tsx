import { Icon } from '@iconify/react'
import { useThemeClasses } from '../../useThemeClasses'
import { EditableText } from '../editable/EditableText'

export function FaqBlock({ content, onChange }: { content: any; onChange?: (content: any) => void }) {
  const { primary } = useThemeClasses()

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
    <div className="py-20 px-12 bg-white max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <div className="font-bold text-xs uppercase tracking-widest mb-2" style={{ color: primary }}>
          <EditableText value={content.tagline} onChange={onChange ? (v) => updateField('tagline', v) : undefined} />
        </div>
        <h2 className="text-4xl font-black text-slate-900">
          <EditableText value={content.title} onChange={onChange ? (v) => updateField('title', v) : undefined} />
        </h2>
      </div>
      <div className="space-y-4">
        {content.items?.map((item: any, i: number) => (
          <div key={i} className="border-b pb-4">
            <div className="flex items-center justify-between font-bold py-2">
              <EditableText value={item.question} onChange={onChange ? (v) => updateItem(i, 'question', v) : undefined} />
              <Icon icon="ph:caret-down-fill" className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-sm text-slate-500 mt-2">
              <EditableText value={item.answer} onChange={onChange ? (v) => updateItem(i, 'answer', v) : undefined} />
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
