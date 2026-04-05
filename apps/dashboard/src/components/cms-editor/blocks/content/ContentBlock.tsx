import { Icon } from '@iconify/react'
import { renderDynamicIcon } from '../utils'
import { useThemeClasses } from '../../useThemeClasses'
import { EditableText } from '../editable/EditableText'

export function ContentBlock({ content, onChange }: { content: any, onChange?: (content: any) => void }) {
  const { primary, primaryWithOpacity } = useThemeClasses()

  const updateField = (field: string, value: any) => {
    onChange?.({ ...content, [field]: value })
  }

  return (
    <div className="py-20 px-12 flex items-center gap-16 bg-white">
      <div className="flex-1 aspect-square bg-slate-100 rounded-[2.5rem] border-8 border-white shadow-2xl relative overflow-hidden group/img">
        {content.image ? (
          <img src={content.image} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <Icon icon="ph:image-fill" className="h-20 w-20" />
          </div>
        )}
        <div className="absolute inset-0 mix-blend-overlay" style={{ backgroundColor: primaryWithOpacity(0.1) }}></div>
      </div>
      <div className="flex-1 space-y-6 text-left">
        <h2 className="text-4xl font-black text-slate-900">
          <EditableText value={content.title} onChange={onChange ? (v) => updateField('title', v) : undefined} />
        </h2>
        <p className="text-slate-600 leading-relaxed">
          <EditableText value={content.text1} onChange={onChange ? (v) => updateField('text1', v) : undefined} />
        </p>
        <p className="text-slate-500 text-sm leading-relaxed">
          <EditableText value={content.text2} onChange={onChange ? (v) => updateField('text2', v) : undefined} />
        </p>
        <div className="grid grid-cols-2 gap-3 pt-4">
          {content.features?.map((f: string) => (
            <div key={f} className="flex items-center gap-2 font-bold text-[11px] text-slate-700">
              {renderDynamicIcon(content.featureIcon || 'check-circle', 'h-4 w-4', primary)}
              {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
