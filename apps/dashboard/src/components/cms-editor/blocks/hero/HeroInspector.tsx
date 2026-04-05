import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { Section, Field } from '../common'
import { MediaPicker } from '../../MediaPicker'
import { IconPicker } from '../../IconPicker'
import { PageSelector } from '../../PageSelector'

export function HeroInspector({ content, onUpdateContent, selectedCta }: { content: any, onUpdateContent: (c: any) => void, selectedCta?: { blockId: string; ctaType: string } | null }) {
  const isPrimarySelected = selectedCta?.ctaType === 'primary'
  const isSecondarySelected = selectedCta?.ctaType === 'secondary'

  return (
    <>
      <Section title="Badge">
        <Field label="Icon">
          <IconPicker value={content.badgeIcon} onSelect={(icon) => onUpdateContent({ ...content, badgeIcon: icon })} />
        </Field>
      </Section>

      <Section title="Background">
        <div className="flex items-center gap-2">
          <Input value={content.image || ''} onChange={(e) => onUpdateContent({ ...content, image: e.target.value })} placeholder="Image URL" className="flex-1" />
          <MediaPicker onSelect={(url) => onUpdateContent({ ...content, image: url })} trigger={<Button variant="outline" size="icon"><Plus className="h-4 w-4" /></Button>} />
        </div>
      </Section>

      <Section title="Primary CTA">
        <div className={`p-3 border rounded-lg bg-muted/20 space-y-3 transition-all ${isPrimarySelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
          <Field label="Link">
            <PageSelector 
              value={content.primaryCta?.href || ''} 
              onChange={(href) => onUpdateContent({ ...content, primaryCta: { ...content.primaryCta, href } })}
              placeholder="Select page or enter URL..."
            />
          </Field>
        </div>
      </Section>

      <Section title="Secondary CTA">
        <div className={`p-3 border rounded-lg bg-muted/20 space-y-3 transition-all ${isSecondarySelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
          <Field label="Link">
            <PageSelector 
              value={content.secondaryCta?.href || ''} 
              onChange={(href) => onUpdateContent({ ...content, secondaryCta: { ...content.secondaryCta, href } })}
              placeholder="Select page or enter URL..."
            />
          </Field>
        </div>
      </Section>
    </>
  )
}