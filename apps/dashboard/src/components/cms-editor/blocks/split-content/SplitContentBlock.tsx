import { cn } from "@/lib/utils"
import { useThemeClasses } from '../../useThemeClasses'
import { EditableText } from '../editable/EditableText'

export function SplitContentBlock({ content, onChange }: { content: any, onChange?: (content: any) => void }) {
  const { primary } = useThemeClasses()
  const isRight = content.imagePosition === 'right'
  
  const updateField = (field: string, value: any) => {
    onChange?.({ ...content, [field]: value })
  }

  const updateCta = (field: string, value: any) => {
    onChange?.({ ...content, cta: { ...content.cta, [field]: value } })
  }

  return (
    <div className={cn(
      "py-20 px-12 flex items-center gap-16 bg-white",
      isRight ? "flex-row-reverse" : "flex-row"
    )}>
      <div className="flex-1 aspect-square bg-slate-100 rounded-3xl overflow-hidden shadow-xl">
        {content.image ? (
          <img src={content.image} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">Image</div>
        )}
      </div>
      <div className="flex-1 space-y-6">
        <div className="font-bold text-xs uppercase tracking-widest" style={{ color: primary }}>
          <EditableText value={content.eyebrow} onChange={onChange ? (v) => updateField('eyebrow', v) : undefined} />
        </div>
        <h2 className="text-4xl font-black text-slate-900">
          <EditableText value={content.title} onChange={onChange ? (v) => updateField('title', v) : undefined} />
        </h2>
        <p className="text-slate-600 leading-relaxed">
          <EditableText value={content.description} onChange={onChange ? (v) => updateField('description', v) : undefined} />
        </p>
        {content.cta?.label && (
          <div className="text-white px-6 py-3 rounded-xl font-bold inline-block" style={{ backgroundColor: primary }}>
            <EditableText value={content.cta.label} onChange={onChange ? (v) => updateCta('label', v) : undefined} />
          </div>
        )}
      </div>
    </div>
  )
}
