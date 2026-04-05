import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from 'lucide-react'
import { Section, Field } from '../common'
import { MediaPicker } from '../../MediaPicker'

export function TeamInspector({ content, onUpdateContent }: { content: any, onUpdateContent: (c: any) => void }) {
  const updateMember = (index: number, value: any) => {
    const newMembers = [...(content.members || [])]
    newMembers[index] = { ...newMembers[index], ...value }
    onUpdateContent({ ...content, members: newMembers })
  }

  const addMember = () => {
    const newMembers = [...(content.members || []), { name: 'Member Name', role: 'Role', image: '' }]
    onUpdateContent({ ...content, members: newMembers })
  }

  const removeMember = (index: number) => {
    const newMembers = content.members.filter((_: any, i: number) => i !== index)
    onUpdateContent({ ...content, members: newMembers })
  }

  return (
    <>
      <Section title="Header">
        <Field label="Tagline"><Input value={content.tagline || ''} onChange={(e) => onUpdateContent({ ...content, tagline: e.target.value })} /></Field>
        <Field label="Title"><Input value={content.title || ''} onChange={(e) => onUpdateContent({ ...content, title: e.target.value })} /></Field>
      </Section>
      <Section title="Members">
        <div className="space-y-2">
          {content.members?.map((m: any, i: number) => (
            <div key={i} className="p-3 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{m.name || `Member ${i+1}`}</p>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeMember(i)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <Field label="Photo URL">
                <div className="flex items-center gap-2">
                  <Input value={m.image || ''} onChange={(e) => updateMember(i, { image: e.target.value })} className="flex-1" />
                  <MediaPicker onSelect={(url) => updateMember(i, { image: url })} trigger={<Button variant="outline" size="icon"><Plus className="h-4 w-4" /></Button>} />
                </div>
              </Field>
              <p className="text-xs text-muted-foreground border-t pt-2">
                Edit name & role on canvas
              </p>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full gap-2 border-dashed" onClick={addMember}>
            <Plus className="h-3 w-3" /> Add Member
          </Button>
        </div>
      </Section>
    </>
  )
}
