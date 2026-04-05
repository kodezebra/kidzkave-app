import { Icon } from '@iconify/react'
import { useThemeClasses } from '../../useThemeClasses'
import { EditableText } from '../editable/EditableText'

export function TeamBlock({ content, onChange }: { content: any, onChange?: (content: any) => void }) {
  const { primary, primaryWithOpacity } = useThemeClasses()

  const updateField = (field: string, value: any) => {
    onChange?.({ ...content, [field]: value })
  }

  const updateMember = (index: number, field: string, value: any) => {
    const newMembers = [...(content.members || [])]
    newMembers[index] = { ...newMembers[index], [field]: value }
    onChange?.({ ...content, members: newMembers })
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
      </div>
      <div className="grid grid-cols-4 gap-6">
        {content.members?.map((member: any, i: number) => (
          <div key={i} className="text-center group/member">
            <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden mb-4 border-4 border-transparent group-hover/member:transition-all" style={{ borderColor: primaryWithOpacity(0.2) }}>
              {member.image ? (
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <Icon icon="ph:users-fill" className="h-10 w-10" />
                </div>
              )}
            </div>
            <div className="font-bold text-sm text-slate-900">
              <EditableText value={member.name} onChange={onChange ? (v) => updateMember(i, 'name', v) : undefined} />
            </div>
            <div className="text-[10px] font-bold uppercase" style={{ color: primary }}>
              <EditableText value={member.role} onChange={onChange ? (v) => updateMember(i, 'role', v) : undefined} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
