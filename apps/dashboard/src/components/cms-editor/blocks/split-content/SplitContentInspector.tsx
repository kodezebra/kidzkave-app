import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { Section, Field } from '../common'
import { MediaPicker } from '../../MediaPicker'

export function SplitContentInspector({ content, onUpdateContent }: { content: any, onUpdateContent: (c: any) => void }) {
  return (
    <>
      <Section title="Image">
        <div className="flex items-center gap-2">
          <Input value={content.image || ''} onChange={(e) => onUpdateContent({ ...content, image: e.target.value })} className="flex-1" />
          <MediaPicker onSelect={(url) => onUpdateContent({ ...content, image: url })} trigger={<Button variant="outline" size="icon"><Plus className="h-4 w-4" /></Button>} />
        </div>
        <div className="mt-3">
          <label className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground/80">Image Position</label>
          <select
            value={content.imagePosition || 'left'}
            onChange={(e) => onUpdateContent({ ...content, imagePosition: e.target.value })}
            className="w-full mt-1.5 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
          >
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>
      </Section>
      <Section title="CTA Button">
        <div className="p-3 border rounded-lg bg-muted/20 space-y-3">
          <Field label="Label"><Input value={content.cta?.label || ''} onChange={(e) => onUpdateContent({ ...content, cta: { ...content.cta, label: e.target.value } })} /></Field>
          <Field label="Href"><Input value={content.cta?.href || ''} onChange={(e) => onUpdateContent({ ...content, cta: { ...content.cta, href: e.target.value } })} placeholder="/about" /></Field>
        </div>
      </Section>
      <p className="text-xs text-muted-foreground border-t pt-4 px-4">
        Edit eyebrow, title & description on canvas
      </p>
    </>
  )
}
