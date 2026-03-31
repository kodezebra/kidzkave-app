import { Input } from "@/components/ui/input"
import { Section, Field } from '../common'
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { IconPicker } from '../../IconPicker'

const eyebrowStyles = [
  { value: 'badge', label: 'Badge' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'icon', label: 'Icon Badge' },
] as const

export function CtaInspector({ content, onUpdateContent }: { content: any, onUpdateContent: (c: any) => void }) {
  const secondaryInfo = content.secondaryInfo || []

  const addSecondaryInfo = () => {
    onUpdateContent({
      ...content,
      secondaryInfo: [...secondaryInfo, { label: '', href: '' }]
    })
  }

  const updateSecondaryInfo = (index: number, field: 'label' | 'href', value: string) => {
    const updated = [...secondaryInfo]
    updated[index] = { ...updated[index], [field]: value }
    onUpdateContent({ ...content, secondaryInfo: updated })
  }

  const removeSecondaryInfo = (index: number) => {
    const updated = secondaryInfo.filter((_: any, i: number) => i !== index)
    onUpdateContent({ ...content, secondaryInfo: updated })
  }

  return (
    <>
      <Section title="Text Content">
        <Field label="Title"><Input value={content.title || ''} onChange={(e) => onUpdateContent({ ...content, title: e.target.value })} /></Field>
        <Field label="Subtitle"><textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-sm" value={content.subtitle || ''} onChange={(e) => onUpdateContent({ ...content, subtitle: e.target.value })} /></Field>
      </Section>
      <Section title="Eyebrow">
        <Field label="Text"><Input value={content.eyebrow || ''} onChange={(e) => onUpdateContent({ ...content, eyebrow: e.target.value })} placeholder="e.g., 2026 Admissions Open Now" /></Field>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Style</label>
          <div className="flex flex-wrap gap-2">
            {eyebrowStyles.map((style) => (
              <button
                key={style.value}
                onClick={() => onUpdateContent({ ...content, eyebrowStyle: style.value })}
                className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                  content.eyebrowStyle === style.value
                    ? 'bg-primary text-white border-primary'
                    : 'bg-muted/50 text-muted-foreground border-muted hover:border-primary'
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>
        {content.eyebrowStyle === 'icon' && (
          <div className="mt-3">
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Icon</label>
            <IconPicker
              value={content.eyebrowIcon}
              onSelect={(icon) => onUpdateContent({ ...content, eyebrowIcon: icon })}
              defaultTab="ui"
            />
          </div>
        )}
      </Section>
      <Section title="Button">
        <div className="p-3 border rounded-lg bg-muted/20 space-y-3">
          <Field label="Label"><Input value={content.ctaLabel || ''} onChange={(e) => onUpdateContent({ ...content, ctaLabel: e.target.value })} /></Field>
          <Field label="Href"><Input value={content.ctaHref || ''} onChange={(e) => onUpdateContent({ ...content, ctaHref: e.target.value })} placeholder="/contact" /></Field>
        </div>
      </Section>
      <Section title="Secondary Info">
        <p className="text-xs text-muted-foreground mb-3">Optional links displayed below the main button (e.g., "View Fees • Call Us")</p>
        {secondaryInfo.map((item: any, index: number) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              value={item.label}
              onChange={(e) => updateSecondaryInfo(index, 'label', e.target.value)}
              placeholder="Label"
              className="flex-1"
            />
            <Input
              value={item.href}
              onChange={(e) => updateSecondaryInfo(index, 'href', e.target.value)}
              placeholder="/fees"
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => removeSecondaryInfo(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" size="sm" className="w-full mt-2" onClick={addSecondaryInfo}>
          <Plus className="h-4 w-4 mr-2" />
          Add Link
        </Button>
      </Section>
    </>
  )
}
