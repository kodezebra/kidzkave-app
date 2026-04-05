import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from 'lucide-react'
import { Section, Field } from '../common'
import { Switch } from "@/components/ui/switch"

export function PricingInspector({ content, onUpdateContent }: { content: any, onUpdateContent: (c: any) => void }) {
  const updateTier = (index: number, value: any) => {
    const newTiers = [...(content.tiers || [])]
    newTiers[index] = { ...newTiers[index], ...value }
    onUpdateContent({ ...content, tiers: newTiers })
  }

  const addTier = () => {
    const newTier = {
      name: 'New Plan',
      description: 'Plan description',
      price: '0',
      currency: '$',
      period: 'month',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      ctaLabel: 'Get Started',
      ctaHref: '#',
      recommended: false,
    }
    const newTiers = [...(content.tiers || []), newTier]
    onUpdateContent({ ...content, tiers: newTiers })
  }

  const removeTier = (index: number) => {
    const newTiers = content.tiers.filter((_: any, i: number) => i !== index)
    onUpdateContent({ ...content, tiers: newTiers })
  }

  const updateFeature = (tierIndex: number, featureIndex: number, value: string) => {
    const newTiers = [...content.tiers]
    const newFeatures = [...newTiers[tierIndex].features]
    newFeatures[featureIndex] = value
    newTiers[tierIndex].features = newFeatures
    onUpdateContent({ ...content, tiers: newTiers })
  }

  const addFeature = (tierIndex: number) => {
    const newTiers = [...content.tiers]
    newTiers[tierIndex].features = [...(newTiers[tierIndex].features || []), 'New feature']
    onUpdateContent({ ...content, tiers: newTiers })
  }

  const removeFeature = (tierIndex: number, featureIndex: number) => {
    const newTiers = [...content.tiers]
    newTiers[tierIndex].features = newTiers[tierIndex].features.filter((_: any, i: number) => i !== featureIndex)
    onUpdateContent({ ...content, tiers: newTiers })
  }

  return (
    <>
      <Section title="Header">
        <Field label="Tagline"><Input value={content.tagline || ''} onChange={(e) => onUpdateContent({ ...content, tagline: e.target.value })} /></Field>
        <Field label="Title"><Input value={content.title || ''} onChange={(e) => onUpdateContent({ ...content, title: e.target.value })} /></Field>
      </Section>
      <Section title="Pricing Tiers">
        <div className="space-y-4">
          {content.tiers?.map((tier: any, i: number) => (
            <div key={i} className="p-3 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{tier.name || `Tier ${i + 1}`}</p>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeTier(i)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Price"><Input type="number" value={tier.price || ''} onChange={(e) => updateTier(i, { price: e.target.value })} /></Field>
                <Field label="Currency"><Input value={tier.currency || '$'} onChange={(e) => updateTier(i, { currency: e.target.value })} /></Field>
              </div>
              <Field label="CTA URL"><Input value={tier.ctaHref || '#'} onChange={(e) => updateTier(i, { ctaHref: e.target.value })} /></Field>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium">Recommended</label>
                <Switch
                  checked={tier.recommended || false}
                  onCheckedChange={(checked) => updateTier(i, { recommended: checked })}
                />
              </div>
              <div className="space-y-2 pt-2 border-t">
                <label className="text-xs font-medium">Features (edit on canvas)</label>
                {tier.features?.map((feature: string, j: number) => (
                  <div key={j} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(i, j, e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeFeature(i, j)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full" onClick={() => addFeature(i)}>
                  <Plus className="h-3 w-3 mr-1" /> Add Feature
                </Button>
              </div>
              <p className="text-xs text-muted-foreground border-t pt-2">
                Edit name, description, price, period & CTA label on canvas
              </p>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full gap-2 border-dashed" onClick={addTier}>
            <Plus className="h-3 w-3" /> Add Pricing Tier
          </Button>
        </div>
      </Section>
    </>
  )
}
